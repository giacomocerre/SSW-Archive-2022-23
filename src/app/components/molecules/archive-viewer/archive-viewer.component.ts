import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Book } from 'src/app/models/classes';
import { BookCardComponent } from '../book-card/book-card.component';
import { ButtonComponent, IconComponent, MessageComponent } from '../../atoms';
import { SingleBookViewInterface } from 'src/app/models/interfaces/components.interfaces';
import { SingleBookViewerComponent } from '../single-book-viewer/single-book-viewer.component';

@Component({
  selector: 'app-archive-viewer',
  templateUrl: './archive-viewer.component.html',
  styleUrls: ['./archive-viewer.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    BookCardComponent,
    ButtonComponent,
    MessageComponent,
    IconComponent,
    SingleBookViewerComponent
  ],
})
export class ArchiveViewerComponent {
  @Input() pagination: { active: boolean; items?: number } = { active: false }; // Opzione per attivare la paginazione e specificare il numero di elementi per pagina (predefinito: non attiva e mostra tutti gli elementi)
  @Input() items: Book[] = []; // Elenco degli elementi da visualizzare nell'archivio

  singleBookOptions: SingleBookViewInterface;
  currentPage: number = 1; // Pagina corrente (predefinita: 1)
  showSingleBook: boolean = false;

  /**
   * Restituisce gli elementi paginati in base alle impostazioni di paginazione.
   * @returns Un array di elementi Book paginati.
   */
  get paginatedItems(): Book[] {
    if (this.pagination && this.pagination.active) {
      const startIndex = (this.currentPage - 1) * this.pagination.items;
      const endIndex = startIndex + this.pagination.items;
      return this.items.slice(startIndex, endIndex);
    } else {
      return this.items;
    }
  }

  /**
   * Naviga alla pagina specificata.
   * @param pageNumber Il numero di pagina a cui navigare.
   */
  goToPage(pageNumber: number): void {
    if (pageNumber >= 1 && pageNumber <= this.totalPages) {
      this.currentPage = pageNumber;
    }
  }

  /**
   * Restituisce il numero totale di pagine in base alle impostazioni di paginazione.
   * @returns Il numero totale di pagine.
   */
  get totalPages(): number {
    if (this.pagination && this.pagination.active) {
      return Math.ceil(this.items.length / this.pagination.items);
    } else {
      return 1;
    }
  }

  /**
   * Restituisce un array di numeri rappresentanti le pagine disponibili.
   * @returns Un array di numeri di pagina.
   */
  get pageNumbers(): number[] {
    return Array(this.totalPages)
      .fill(0)
      .map((_, index) => index + 1);
  }

  showSingleBookView(opt: SingleBookViewInterface){
    console.log(opt)
    this.showSingleBook = true;
    this.singleBookOptions = opt;
  }
}
