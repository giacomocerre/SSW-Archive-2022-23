import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Book } from 'src/app/models/classes';
import { BookCardComponent } from '../book-card/book-card.component';
import { ButtonComponent } from '../../atoms';

@Component({
  selector: 'app-archive-viewer',
  templateUrl: './archive-viewer.component.html',
  styleUrls: ['./archive-viewer.component.scss'],
  standalone: true,
  imports: [CommonModule, BookCardComponent, ButtonComponent]
})
export class ArchiveViewerComponent {
  @Input() pagination: { active: boolean, items: number };
  @Input() items: Book[] = [];
  currentPage = 1;
  currentView = "box"

  get paginatedItems(): Book[] {
    if (this.pagination && this.pagination.active) {
      const startIndex = (this.currentPage - 1) * this.pagination.items;
      const endIndex = startIndex + this.pagination.items;
      return this.items.slice(startIndex, endIndex);
    } else {
      return this.items;
    }
  }

  goToPage(pageNumber: number): void {
    if (pageNumber >= 1 && pageNumber <= this.totalPages) {
      this.currentPage = pageNumber;
    }
  }

  get totalPages(): number {
    if (this.pagination && this.pagination.active) {
      return Math.ceil(this.items.length / this.pagination.items);
    } else {
      return 1;
    }
  }

  get pageNumbers(): number[] {
    return Array(this.totalPages).fill(0).map((_, index) => index + 1);
  }
}
