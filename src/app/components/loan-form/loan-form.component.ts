import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { InputComponent } from '../input/input.component';
import { IconComponent } from '../icon/icon.component';
import { ArchiveService } from '../../services/archive.service';
import { ButtonComponent } from '../button/button.component';
import { ActionStatusInterface } from '../../models/interfaces/classes.interfaces';
import { MessageComponent } from '../message/message.component';
import { Book } from '../../models/classes';

@Component({
  selector: 'app-loan-form',
  templateUrl: './loan-form.component.html',
  styleUrls: ['./loan-form.component.scss'],
  standalone: true,
  imports: [CommonModule, InputComponent, IconComponent, ButtonComponent, MessageComponent]
})
export class LoanFormComponent implements OnInit {
  @Input() id: string; // ID del libro per cui viene visualizzato il modulo di prestito.
  @Output() closeLoan = new EventEmitter<boolean>(); // Evento emesso quando viene chiuso il modulo di prestito.
  book: Book;
  name; surname: string;
  message: ActionStatusInterface; // Messaggio di stato dell'azione di prestito.

  constructor(private archiveService: ArchiveService) {}

  ngOnInit(): void {
    this.archiveService.archive$.subscribe((archive) => {
      this.book = archive.findBookById(this.id);
    });
  }

  /**
   * Salva il modulo di prestito e esegue l'azione di prestito.
   */
  save() {
    this.message = this.archiveService.onLoanAction(this.id, 'borrow', {
      name: this.name,
      surname: this.surname
    });
  }
}
