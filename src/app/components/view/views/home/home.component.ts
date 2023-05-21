import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageComponent } from '../../../../components/atoms';
import { BookCardComponent, WidgetComponent } from '../../../../components/molecules';
import { ArchiveService } from '../../../../services/archive.service';
import { Book } from '../../../../models/classes';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [HttpClientModule, CommonModule, WidgetComponent, BookCardComponent, MessageComponent],
  providers: [ArchiveService],
})
export class HomeComponent implements OnInit {
  totalBooks: number = 0;
  totalOnLoan: number = 0;
  recentBooks: Book[] = [];

  constructor(private archiveService: ArchiveService) {}

  ngOnInit(): void {
    this.archiveService.archive$.subscribe(archive => {
      this.totalBooks = archive.getBooks().length
      this.totalOnLoan = archive.getBooksOnLoan().length
      this.recentBooks = archive.getRecentBooks(5)
    });
  }
}