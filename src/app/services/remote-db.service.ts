import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Archive, Book } from '../types/classes';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RemoteDatabaseService {
  private baseUrl =
    'https://eu-central-1.aws.data.mongodb-api.com/app/kvaas-giwjg/endpoint';
  private apiKey = 'd6f7e1fe';

  constructor(private http: HttpClient) {}

  getArchive(): Observable<Archive> {
    return this.http
      .get<string>(`${this.baseUrl}/get?key=${this.apiKey}`)
      .pipe(map((response: string) => JSON.parse(response)));
  }

  setArchive(body: Archive): Observable<any> {
    return this.http.post<any>(
      `${this.baseUrl}/set?key=${this.apiKey}`,
      JSON.stringify(body)
    );
  }

  getBookCount(filter: string): Observable<number> {
    return this.getArchive().pipe(
      map((response: Archive) => {
        const books = response.books;

        if (filter === 'total') {
          return books.length;
        } else if (filter === 'onLoan') {
          const booksOnLoan = books.filter(
            (book: Book) => book.onLoan
          );
          return booksOnLoan.length;
        }

        throw new Error(`Invalid filter: ${filter}`);
      })
    );
  }

  getLastAddedBooks(): Observable<Book[]> {
    return this.getArchive().pipe(
      map((response: Archive) => {
        const books = response.books;

        const lastAddedBooks = [...books]
          .sort(
            (a: Book, b: Book) =>
              (b.date ? new Date(b.date) : new Date(0)).getTime() -
              (a.date ? new Date(a.date) : new Date(0)).getTime()
          )
          .slice(0, 5);

        return lastAddedBooks;
      })
    );
  }
}
