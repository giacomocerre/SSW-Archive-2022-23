import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Book } from '../../models/classes';
import { IconComponent } from '../icon/icon.component';
import { ButtonComponent } from '../button/button.component';
import { LoanFormComponent } from '../loan-form/loan-form.component';
import { ArchiveService } from '../../services/archive.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss'],
  standalone: true,
  imports: [CommonModule, IconComponent, ButtonComponent, LoanFormComponent]
})
export class ArchiveComponent {
  @Input() books: Book[];
  @Input() bookToShow: number; //Numero massimo di libri da visualizzare.
  showLoan = false; // Flag per mostrare o nascondere il modulo di prestito.
  selectedID: string;

  constructor(private archiveService: ArchiveService){}

  /**
   * Rimuove un libro dall'archivio.
   * @param id - ID del libro da rimuovere.
   */
  removeBook(id:string) {
    this.selectedID = id;
    this.archiveService.removeBookFromArchive(id);
  }

  /**
   * Visualizza il modulo di prestito o esegue un'azione specifica sul libro.
   * @param id - ID del libro selezionato.
   * @param onLoan - Flag che indica se il libro è in prestito.
   */
  viewLoan(id:string, onLoan:boolean){
    this.selectedID = id;
    if(onLoan){
      this.archiveService.onLoanAction(id, 'return'); // restituisce il libro se gia in prestito
    }else{
      this.showLoan = true;
    }
  }
}
