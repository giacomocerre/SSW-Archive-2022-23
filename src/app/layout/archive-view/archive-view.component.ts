import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/classes';
import { ArchiveService } from 'src/app/services/archive.service';
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

  constructor(private archiveService: ArchiveService){}

  ngOnInit(): void {
    this.archiveService.archive$.subscribe((archive) => {
      this.books = archive.getBooks();
    })
  }

  search(input: string) {
    this.archiveService.archive$.subscribe((archive) => {
      this.books = archive.findBooksByKeyword(input);
    })
  }
}
