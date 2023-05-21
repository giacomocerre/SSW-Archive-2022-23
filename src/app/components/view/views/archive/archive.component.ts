import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  ButtonComponent,
  InputComponent,
  OpenerComponent,
} from '../../../../components/atoms';
import { ArchiveService } from '../../../../services/archive.service';
import { Book } from '../../../../models/classes';
import { ArchiveViewerComponent } from '../../../../components/molecules';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss'],
  standalone: true,
  imports: [HttpClientModule, OpenerComponent, ButtonComponent, InputComponent, ArchiveViewerComponent],
  providers: [ArchiveService],
})
export class ArchiveComponent implements OnInit{
  books: Book[] = [];

  constructor(private archiveService: ArchiveService) {}

  ngOnInit(): void {
    this.archiveService.archive$.subscribe((archive) => {
      this.books = archive.getBooks();
    });
  }

  saveBook() {
    this.archiveService.addBookToArchive(
      new Book('1', 'A1', 'To Kill a Mockingbird', 'Harper Lee', new Date(), false)
    );
    
    this.archiveService.addBookToArchive(
      new Book('2', 'A2', '1984', 'George Orwell', new Date(), false)
    );
    
    this.archiveService.addBookToArchive(
      new Book('3', 'A3', 'The Great Gatsby', 'F. Scott Fitzgerald', new Date(), false)
    );
    
    this.archiveService.addBookToArchive(
      new Book('4', 'A4', 'Pride and Prejudice', 'Jane Austen', new Date(), false)
    );
    
    this.archiveService.addBookToArchive(
      new Book('5', 'A5', 'The Catcher in the Rye', 'J.D. Salinger', new Date(), false)
    );
    
    this.archiveService.addBookToArchive(
      new Book('6', 'A6', 'To the Lighthouse', 'Virginia Woolf', new Date(), false)
    );
    
    this.archiveService.addBookToArchive(
      new Book('7', 'A7', 'Brave New World', 'Aldous Huxley', new Date(), false)
    );
    
    this.archiveService.addBookToArchive(
      new Book('8', 'A8', 'Moby-Dick', 'Herman Melville', new Date(), false)
    );
    
    this.archiveService.addBookToArchive(
      new Book('9', 'A9', 'The Lord of the Rings', 'J.R.R. Tolkien', new Date(), false)
    );
    
    this.archiveService.addBookToArchive(
      new Book('10', 'A10', 'The Chronicles of Narnia', 'C.S. Lewis', new Date(), false)
    );
    
  }

  searchBooks(keyword: string) {
    this.archiveService.archive$.subscribe((archive) => {
      this.books = archive.findBooksByKeyword(keyword);
    });
  }
}
