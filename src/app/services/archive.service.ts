import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Archive, Book } from '../models/classes';

@Injectable({
  providedIn: 'root',
})
export class ArchiveService {
  private baseUrl =
    'https://eu-central-1.aws.data.mongodb-api.com/app/kvaas-giwjg/endpoint'; // Endpoint di KVaaS
  private apiKey = 'd6f7e1fe'; // Chiave API per l'autenticazione

  // BehaviorSubject per condividere l'istanza di Archive
  private archiveSubject = new BehaviorSubject<Archive>(new Archive());

  // Observable per sottoscriversi agli aggiornamenti dell'istanza di Archive
  public archive$: Observable<Archive> = this.archiveSubject.asObservable();

  constructor(private http: HttpClient) {
    // Recupera i dati iniziali dell'Archive dall'API e inizializza il BehaviorSubject
    this.fetchArchiveData().subscribe((archive) => {
      this.archiveSubject.next(archive);
    });
  }

  /**
   * Recupera i dati dell'Archive dall'API.
   * @returns Un Observable che emette un'istanza di Archive.
   */
  private fetchArchiveData(): Observable<Archive> {
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
  private updateArchive(body: Archive): Observable<any> {
    return this.http
      .post<any>(`${this.baseUrl}/set?key=${this.apiKey}`, JSON.stringify(body))
      .pipe(
        map((response) => {
          this.archiveSubject.next(body);
          return response;
        })
      );
  }

  /**
   * Aggiunge un libro all'Archive.
   * @param book Il libro da aggiungere.
   */
  addBookToArchive(book: Book): void {
    const archive = this.archiveSubject.getValue(); // Ottieni l'istanza corrente di Archive
    archive.addBook(book); // Aggiungi il libro all'istanza di Archive
    this.updateArchive(archive).subscribe();
  }

  /**
   * Rimuove un libro dall'Archive.
   * @param id L'ID del libro da rimuovere.
   */
  removeBookFromArchive(id: string): void {
    const archive = this.archiveSubject.getValue(); // Ottieni l'istanza corrente di Archive
    archive.removeBook(id); // Rimuove il libro dall'istanza di Archive
    this.updateArchive(archive).subscribe();
  }

  /**
   * Resetta Archive.
   */
  resetArchive(): void {
    this.updateArchive(new Archive()).subscribe();
  }
}
