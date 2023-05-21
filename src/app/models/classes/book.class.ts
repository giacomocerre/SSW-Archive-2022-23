import { StatusInterface, User } from "../interfaces/classes.interfaces";

/**
 * Classe che rappresenta un libro nell'archivio.
 */
export class Book {
  id: string;
  archivePosition: string;
  title: string;
  author: string;
  date: Date;
  onLoan: boolean;
  user?: User;

  /**
   * Costruttore della classe Book.
   * @param id ID del libro.
   * @param archivePosition Posizione del libro nell'archivio.
   * @param title Titolo del libro.
   * @param author Autore del libro.
   * @param date Data di aggiunta del libro nell archivio.
   * @param onLoan Indica se il libro è in prestito o disponibile.
   * @param user (Opzionale) L'utente che ha preso in prestito il libro.
   */
  constructor(
    id: string,
    archivePosition: string,
    title: string,
    author: string,
    date: Date,
    onLoan: boolean,
    user?: User
  ) {
    this.id = id;
    this.archivePosition = archivePosition;
    this.title = title;
    this.author = author;
    this.date = date;
    this.onLoan = onLoan;
    this.user = user;
  }

  /**
   * Restituisce la data di pubblicazione del libro nel formato desiderato yy/mm/gg.
   * @returns La data di pubblicazione formattata come stringa.
   */
  getFormattedDate(): string {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return this.date.toLocaleDateString(undefined, options);
  }

  /**
   * Restituisce lo stato di prestito del libro.
   * @returns Un oggetto che contiene lo stato di prestito del libro e un messaggio corrispondente.
   */
  getLoanStatus(): StatusInterface {
    if (this.onLoan && this.user) {
      return { value: false, message: `In prestito a: ${this.user.name} ${this.user.surname} dal ${this.getFormattedDate()}` };
    } else {
      return { value: true, message: "Disponibile" };
    }
  }
}
