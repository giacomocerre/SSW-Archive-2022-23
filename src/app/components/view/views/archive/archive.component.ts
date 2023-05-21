import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { ButtonComponent, InputComponent } from '../../../../components/atoms';
import { ArchiveService } from '../../../../services/archive.service';
import { Book } from '../../../../models/classes';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss'],
  standalone: true,
  imports: [HttpClientModule, ButtonComponent, InputComponent],
  providers: [ArchiveService],
})
export class ArchiveComponent {
  findBooks: Book[] = []

  constructor(private archiveService: ArchiveService) {}

  saveBook() {
    this.archiveService.addBookToArchive(
      new Book('1', 'A1', 'Libro prova 1', 'Roman 1', new Date(), false)
    );
    this.archiveService.addBookToArchive(
      new Book('2', 'A2', 'Libro prova 2', 'Roman 2', new Date(), false)
    );
  }

  searchBooks(keyword: string) {
    this.archiveService.archive$.subscribe((archive) => {
      this.findBooks = archive.findBooksByKeyword(keyword)
    });
  }
}
