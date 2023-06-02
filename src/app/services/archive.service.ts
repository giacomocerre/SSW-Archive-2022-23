import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Archive, Book } from '../models/classes';
import { ActionStatusInterface, User, LoanActions} from '../models/interfaces/classes.interfaces';

@Injectable({
  providedIn: 'root',
})
export class ArchiveService {
  private baseUrl = 'https://eu-central-1.aws.data.mongodb-api.com/app/kvaas-giwjg/endpoint'; // Endpoint di KVaaS
  private apiKey = 'd6f7e1fe'; // Chiave API per l'autenticazione
  public archive$ = new BehaviorSubject<Archive>(new Archive()); // BehaviorSubject per condividere l'istanza di Archive

  constructor(private http: HttpClient) {
    // inizializza il BehaviorSubject --> archive$
    this.fetchArchiveData$().subscribe((archive) => {
      this.archive$.next(archive);
    });
  }

  /**
   * Recupera i dati dell'Archive dall'API.
   * @returns Un Observable che emette un'istanza di Archive.
   */
  private fetchArchiveData$(): Observable<Archive> {
    return this.http.get<string>(`${this.baseUrl}/get?key=${this.apiKey}`).pipe(
      map((response) => {
        const { books } = JSON.parse(response) || {};
        const archive = new Archive(); // Crea una nuova istanza di Archive
        if (Array.isArray(books)) {
          books.forEach((bookData) => {
            archive.addBook( // Aggiunge il libro all'istanza di Archive
              new Book(
                bookData.id,
                bookData.archivePosition,
                bookData.title,
                bookData.author,
                new Date(bookData.date),
                bookData.onLoan,
                bookData.user
              )
            );
          });
        }
        return archive;
      })
    );
  }

  /**
   * Aggiorna l'Archive sul server.
   * @param body Il corpo della richiesta di aggiornamento.
   * @returns Un Observable che emette la risposta dell'API.
   */
  private updateArchive$(body: Archive): Observable<any> {
    return this.http
      .post<string>(
        `${this.baseUrl}/set?key=${this.apiKey}`,
        JSON.stringify(body)
      )
      .pipe(
        map((response) => {
          this.archive$.next(body);
          return response;
        })
      );
  }

  /**
   * Aggiunge un libro all'Archive.
   * @param book Il libro da aggiungere.
   * @returns Un oggetto ActionStatusInterface che indica lo stato dell'operazione.
   */
  addBookToArchive(book: Book): ActionStatusInterface {
    const archive = this.archive$.getValue();

    // Controllo campi obbligatori
    if (!book.title || !book.author || !book.archivePosition) {
      return { status: 400, message: 'Campi non compilati correttamente' };
    }

    // Controllo duplicati nella posizione
    if (archive.isPositionTaken(book.archivePosition)) {
      return {
        status: 400,
        message: "La posizione esiste già nell'archivio",
      };
    }

    archive.addBook(book);
    this.updateArchive$(archive).subscribe();
    return { status: 200, message: 'Libro aggiunto correttamente' };
  }

  /**
   * Rimuove un libro dall'Archive.
   * @param id L'ID del libro da rimuovere.
   * @returns Un oggetto ActionStatusInterface che indica lo stato dell'operazione.
   */
  removeBookFromArchive(id: string): ActionStatusInterface {
    const archive = this.archive$.getValue();
    const bookToRemove = archive.findBookById(id);

    // Controllo libro in prestito o inesistente
    if (!bookToRemove || bookToRemove.onLoan) {
      return {
        status: 400,
        message: 'Non è possibile eliminare il libro perché è in prestito.',
      };
    }

    archive.removeBook(id);
    this.updateArchive$(archive).subscribe();
    return { status: 200, message: 'Libro Rimosso!' };
  }

  /**
   * Performa la restituzione o il noleggio di un libro.
   * @param id L'ID del libro da prestare o restituire.
   * @param type Il tipo di azione che si vuole svolgere ["return" o "borrow"].
   * @param user (opzionale) L'utente a cui prestare il libro.
   * @returns Un oggetto ActionStatusInterface che indica lo stato dell'operazione.
   */
  onLoanAction( id: string, type: LoanActions, user?: User): ActionStatusInterface {
    const archive = this.archive$.getValue();

    if (type === 'return') {
      archive.returnBook(id);
      this.updateArchive$(archive).subscribe();
      return { status: 200, message: 'Libro restituito!' };
    }

    // Controllo campi obbligatori per il prestito
    if (!user || !user.name || !user.surname) {
      return { status: 400, message: 'Inserisci i campi correttamente.' };
    }

    archive.borrowBook(id, user);
    this.updateArchive$(archive).subscribe();
    return { status: 200, message: 'Libro prestato!' };
  }
}
