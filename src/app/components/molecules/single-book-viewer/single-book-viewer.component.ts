import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Book } from 'src/app/models/classes';
import { SingleBookViewInterface } from 'src/app/models/interfaces/components.interfaces';

@Component({
  selector: 'app-single-book-viewer',
  templateUrl: './single-book-viewer.component.html',
  styleUrls: ['./single-book-viewer.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class SingleBookViewerComponent {
  @Input() item: Book;
  @Input() options: SingleBookViewInterface;
  @Output() closeSingle: EventEmitter<boolean> = new EventEmitter<boolean>();
}
