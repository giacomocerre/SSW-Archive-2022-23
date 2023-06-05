import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Book } from '../../models/classes';
import { ArchiveService } from '../../services/archive.service';
import { InputComponent } from '../input/input.component';
import { ButtonComponent } from '../button/button.component';
import { IconComponent } from '../icon/icon.component';
import { MessageComponent } from '../message/message.component';
import { ActionStatusInterface } from '../../models/interfaces/classes.interfaces';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    InputComponent,
    ButtonComponent,
    IconComponent,
    MessageComponent,
  ],
})
export class AddFormComponent {
  @Output() close = new EventEmitter<boolean>();
  archivePosition;
  title;
  author: string;
  message: ActionStatusInterface;

  constructor(private archiveService: ArchiveService) {}

  /**
   * Salva un nuovo libro nell'archivio.
   */
  saveBook() {
    this.message = this.archiveService.addBookToArchive(
      new Book(
        Math.random().toString(36).substring(7),
        this.archivePosition,
        this.title,
        this.author,
        new Date(),
        false
      )
    );
  }
}
