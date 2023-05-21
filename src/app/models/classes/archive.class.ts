import { Book } from './book.class';
import { User } from '../interfaces/classes.interfaces';

/**
 * Classe che rappresenta l'archivio dei libri.
 */
export class Archive {
  private books: Book[];

  /**
   * Costruttore della classe Archive.
   * Inizializza un nuovo archivio senza libri.
   */
  constructor() {
    this.books = [];
  }

  /**
   * Aggiunge un libro all'archivio.
   * @param book Il libro da aggiungere.
   */
  addBook(book: Book) {
    this.books.push(book);
  }

  /**
   * Rimuove un libro dall'archivio.
   * @param id ID del libro da rimuovere.
   */
  removeBook(id: string) {
    console.log(id)
    this.books = this.books.filter((book) => book.id !== id);
  }

  /**
   * Restituisce tutti i libri nell'archivio.
   * @returns Un array di tutti i libri nell'archivio.
   */
  getBooks(): Book[] {
    return this.books;
  }

  /**
   * Restituisce tutti i libri in prestito nell'archivio.
   * @returns Un array di tutti i libri in prestito nell'archivio.
   */
  getBooksOnLoan(): Book[] {
    return this.books.filter((book) => book.onLoan);
  }

  /**
   * Restituisce tutti i libri disponibili nell'archivio.
   * @returns Un array di tutti i libri disponibili nell'archivio.
   */
  getBooksAvailable(): Book[] {
    return this.books.filter((book) => !book.onLoan);
  }

  /**
   * Cerca un libro nell'archivio tramite ID.
   * @param id ID del libro da cercare.
   * @returns Il libro corrispondente all'ID o undefined se non trovato.
   */
  findBookById(id: string): Book | undefined {
    return this.books.find((book) => book.id === id);
  }

  /**
   * Cerca i libri nell'archivio tramite parola chiave.
   * La ricerca viene effettuata sia nel titolo che nell'autore.
   * @param keyword Parola chiave da cercare.
   * @returns Un array di libri corrispondenti alla parola chiave.
   */
  findBooksByKeyword(keyword: string): Book[] {
    const lowerCaseKeyword = keyword.toLowerCase();
    return this.books.filter(
      (book) =>
        book.title.toLowerCase().includes(lowerCaseKeyword) ||
        book.author.toLowerCase().includes(lowerCaseKeyword)
    );
  }

  /**
   * Prende in prestito un libro.
   * Imposta lo stato di prestito del libro a true e aggiunge l'utente che ha preso in prestito il libro.
   * @param id ID del libro da prestare.
   * @param user L'utente che prende in prestito il libro.
   */
  borrowBook(id: string, user: User) {
    const book = this.findBookById(id);
    if (book && !book.onLoan) {
      book.onLoan = true;
      book.user = user;
    }
  }

  /**
   * Restituisce un libro precedentemente prestato.
   * Imposta lo stato di prestito del libro a false e rimuove l'utente associato.
   * @param id ID del libro da restituire.
   */
  returnBook(id: string) {
    const book = this.findBookById(id);
    if (book && book.onLoan) {
      book.onLoan = false;
      book.user = undefined;
    }
  }

  getRecentBooks(n: number): Book[] {
    return this.books.sort((a: Book, b: Book) => b.date.getTime() - a.date.getTime()).slice(0, n);
  }
}
