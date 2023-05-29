import { Component, OnInit } from '@angular/core';
import { WidgetComponent } from '../../components';
import { ArchiveService } from '../../services/archive.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
  standalone: true,
  imports: [WidgetComponent],
})
export class ViewComponent implements OnInit {
  totalBooks: number = 0;
  totalOnLoan: number = 0;
  totalAvailable: number = 0;

  constructor(private archiveService: ArchiveService) {}

  ngOnInit() {
    this.archiveService.archive$.subscribe((archive) => {
      this.totalBooks = archive.getBooks().length;
      this.totalOnLoan = archive.getBooksOnLoan().length;
      this.totalAvailable = archive.getBooksAvailable().length;
    });
  }
}
