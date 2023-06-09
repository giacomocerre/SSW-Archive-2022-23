import { Component, OnInit } from '@angular/core';
import { WidgetComponent } from '../../components';
import { ArchiveService } from '../../services/archive.service';
import { ArchiveViewComponent } from '../archive-view/archive-view.component';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
  standalone: true,
  imports: [WidgetComponent, ArchiveViewComponent],
})
export class ViewComponent implements OnInit {
  totalBooks; totalOnLoan; totalAvailable = 0;

  constructor(private archiveService: ArchiveService) {}

  ngOnInit() {
    this.archiveService.archive$.subscribe((archive) => {
      this.totalBooks = archive.getBooks().length;
      this.totalOnLoan = archive.getBooksOnLoan().length;
      this.totalAvailable = archive.getBooksAvailable().length;
    });
  }

}
