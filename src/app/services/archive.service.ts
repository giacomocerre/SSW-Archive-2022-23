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
    'https://eu-central-1.aws.data.mongodb-api.com/app/kvaas-giwjg/endpoint'; // KVaaS Endpoint
  private apiKey = 'd6f7e1fe'; // Chiave API per l'autenticazione
  private archiveSubject = new BehaviorSubject<Archive>(new Archive()); // BehaviorSubject per condividere l'istanza di Archive
  public archive$: Observable<Archive> = this.archiveSubject.asObservable(); // Observable per sottoscriversi agli aggiornamenti dell'istanza di Archive

  constructor(private http: HttpClient) {
    this.fetchArchiveData().subscribe((archive) => {
      this.archiveSubject.next(archive); // Inizializza il BehaviorSubject con l'istanza di Archive ottenuta dall'API
    });
  }

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

  addBookToArchive(book: Book): void {
    const archive = this.archiveSubject.getValue(); // Ottieni l'istanza corrente di Archive
    archive.addBook(book); // Aggiungi il libro all'istanza di Archive
    this.updateArchive(archive).subscribe();
  }

  removeBookToArchive(id: string): void {
    const archive = this.archiveSubject.getValue(); // Ottieni l'istanza corrente di Archive
    archive.removeBook(id); // rimovove il libro all'istanza di Archive
    this.updateArchive(archive).subscribe();
  }

  resetArchive(): void {
    this.updateArchive(new Archive()).subscribe();
  }
}
