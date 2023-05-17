// ****** Classes ******

export class Archive {
  books: Book[];
}

export class Book {
  position: string;
  author: string;
  title: string;
  onLoan: boolean;
  user?: User;
  date?: Date;
}

export class User {
  name: string;
  surname: string;
}

