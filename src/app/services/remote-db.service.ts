import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ArchiveInterface, BookInterface } from '../types';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RemoteDatabaseService {
  private baseUrl =
    'https://eu-central-1.aws.data.mongodb-api.com/app/kvaas-giwjg/endpoint';
  private apiKey = 'd6f7e1fe'; // Inserire qui la chiave appena creata

  constructor(private http: HttpClient) {}

  getArchive(): Observable<ArchiveInterface> {
    return this.http.get<string>(`${this.baseUrl}/get?key=${this.apiKey}`).pipe(
      map((response: string) => JSON.parse(response))
    );
  }

  setArchive(body: ArchiveInterface): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/set?key=${this.apiKey}`, JSON.stringify(body));
  }
  
  getBookCount(filter: string): Observable<number> {
    return this.getArchive().pipe(
      map((response: ArchiveInterface) => {
        const books = response.books;
  
        if (filter === 'total') {
          return books.length;
        } else if (filter === 'onLoan') {
          const booksOnLoan = books.filter((book: BookInterface) => book.onLoan);
          return booksOnLoan.length;
        }
  
        throw new Error(`Invalid filter: ${filter}`);
      })
    );
  }

  getLastAddedBooks(): Observable<BookInterface[]> {
    return this.getArchive().pipe(
      map((response: ArchiveInterface) => {
        const books = response.books;
  
        const lastAddedBooks = [...books].sort((a: BookInterface, b: BookInterface) =>
          (b.date ? new Date(b.date) : new Date(0)).getTime() -
          (a.date ? new Date(a.date) : new Date(0)).getTime()
        ).slice(0, 5);
  
        return lastAddedBooks;
      })
    );
  }
  
}
