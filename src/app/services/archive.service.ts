import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Archive, Book } from '../models/classes';
import { ActionStatusInterface, User } from '../models/interfaces/classes.interfaces';

@Injectable({
  providedIn: 'root',
})
export class ArchiveService {
  private baseUrl =
    'https://eu-central-1.aws.data.mongodb-api.com/app/kvaas-giwjg/endpoint'; // Endpoint di KVaaS
  private apiKey = 'd6f7e1fe'; // Chiave API per l'autenticazione

  // BehaviorSubject per condividere l'istanza di Archive
  public archive$ = new BehaviorSubject<Archive>(new Archive());

  constructor(private http: HttpClient) {
    // Recupera i dati iniziali dell'Archive dall'API e inizializza il BehaviorSubject archive$
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
        const archive = new Archive();
        if (Array.isArray(books)) {
          books.forEach((bookData) => {
            const { id, archivePosition, title, author, date, onLoan, user } =
              bookData;
            archive.addBook(
              new Book(
                id,
                archivePosition,
                title,
                author,
                new Date(date),
                onLoan,
                user
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
      .post<any>(`${this.baseUrl}/set?key=${this.apiKey}`, JSON.stringify(body))
      .pipe(
        map((response) => {
          this.archive$.next(body);
          return response;
        })
      );
  }

  /**
   * Aggiunge un libro all'Ar chive.
   * @param book Il libro da aggiungere.
   */
  addBookToArchive(book: Book): ActionStatusInterface {
    if (book.title || book.author || book.archivePosition) { // controllo sul libro vuoto
      const archive = this.archive$.getValue(); // Ottieni l'istanza corrente di Archive
      archive.addBook(book); // Aggiungi il libro all'istanza di Archive
      this.updateArchive$(archive).subscribe();
      return {status: 200, message: 'Libro aggiunto correttamete'}
    }else{
      return {status: 400, message: 'Campi non compilati correttamente'}
    }
  }

  /**
   * Rimuove un libro dall'Archive.
   * @param id L'ID del libro da rimuovere.
   */
  removeBookFromArchive(id: string): ActionStatusInterface {
    const archive = this.archive$.getValue(); // Get the current instance of Archive
    const bookToRemove = archive.findBookById(id); // Ottieni l'istanza corrente di Archive
    if ( bookToRemove && !bookToRemove.onLoan) { // controllo sul libro che non si in prestito
      archive.removeBook(id); // rimuovi libro
      this.updateArchive$(archive).subscribe();
      return  {status: 200, message: "Libro Rimosso"}
    } else {
      return  {status: 400, message: "Non è possibile eliminare il libro perche è in prestito."}
    }
  }

  onLoanAction(id:string, type:string, user?: User): ActionStatusInterface {
    console.log(id, type, user)
    const archive = this.archive$.getValue();
    if(type == "borrow"){
      if(user.name && user.surname){
        archive.borrowBook(id, user)
        this.updateArchive$(archive).subscribe();
        return {status: 200, message:"Libro prestato!"}
      }else{
        return {status: 400, message: "Inserisci i campi correttamente."}
      }
    }else{
      archive.returnBook(id)
      this.updateArchive$(archive).subscribe();
      return {status: 200, message:"Libro restituito!"}

    }
  }

  /**
   * Resetta Archive.
   */
  resetArchive(): void {
    this.updateArchive$(new Archive()).subscribe();
  }
}
