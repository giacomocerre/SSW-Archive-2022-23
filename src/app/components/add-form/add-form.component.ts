import { HttpClientModule } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { Book } from '../../models/classes';
import { ArchiveService } from '../../services/archive.service';
import { v4 as uuidv4 } from 'uuid';
import { InputComponent } from '../input/input.component';
import { ButtonComponent } from '../button/button.component';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';
import { MessageComponent } from '../message/message.component';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    InputComponent,
    ButtonComponent,
    IconComponent,
    MessageComponent,
  ],
})
export class AddFormComponent {
  @Output() close = new EventEmitter<boolean>();
  archivePosition: string;
  title: string;
  author: string;
  error: boolean = false;
  success: boolean = false;

  constructor(private archiveService: ArchiveService) {}

  saveBook() {
    if (this.archivePosition && this.title && this.author) {
      this.archiveService.addBookToArchive(
        new Book(
          uuidv4(),
          this.archivePosition,
          this.title,
          this.author,
          new Date(),
          false
        )
      );
      this.error = false;
      this.success = true;
    } else {
      this.error = true;
    }
  }
}
