import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../../atoms';
import { OptionsMenuComponent } from '../options-menu/options-menu.component';
import { Book } from '../../../models/classes';
import { SingleBookViewInterface } from 'src/app/models/interfaces/components.interfaces';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss'],
  standalone: true,
  imports: [CommonModule, IconComponent, OptionsMenuComponent],
})
export class BookCardComponent {
  @Input() item: Book;
  @Output() selectedOption: EventEmitter<SingleBookViewInterface> =
    new EventEmitter<SingleBookViewInterface>();
  showOptionsMenu: boolean = false; // valore booleano per mostrare le opzioni possibili.
}
