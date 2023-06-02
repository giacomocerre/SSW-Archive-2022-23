import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/classes';
import { ArchiveService } from '../../services/archive.service';
import { InputComponent } from '../../components/input/input.component';
import { ArchiveComponent } from '../../components';

@Component({
  selector: 'app-archive-view',
  templateUrl: './archive-view.component.html',
  styleUrls: ['./archive-view.component.scss'],
  standalone: true,
  imports: [CommonModule, HttpClientModule, InputComponent, ArchiveComponent],
})
export class ArchiveViewComponent implements OnInit {
  books: Book[];

  constructor(private archiveService: ArchiveService) {}

  ngOnInit(): void {
    this.archiveService.archive$.subscribe((archive) => {
      this.books = archive.getBooks();      
    });
  }

  /**
   * Effettua una ricerca nell'archivio in base alla parola chiave fornita.
   * @param input La parola chiave di ricerca.
   */
  search(input: string) {
    this.archiveService.archive$.subscribe((archive) => {
      this.books = archive.findBooksByKeyword(input);
    });
  }
}
