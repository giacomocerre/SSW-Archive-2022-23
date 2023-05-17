import { Component, Input } from '@angular/core';
import { SingleBookInterface } from '../../../types/interfaces';
import { IconComponent } from '../../atoms';
import { CommonModule } from '@angular/common';
import { Book } from '../../../types/classes';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss'],
  standalone: true,
  imports: [CommonModule,IconComponent],
})
export class BookCardComponent implements SingleBookInterface {
  @Input() item: Book;
}