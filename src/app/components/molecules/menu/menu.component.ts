import { Component, EventEmitter, Output } from '@angular/core';
import { IconComponent } from '../../atoms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  standalone: true,
  imports: [CommonModule, IconComponent]
})
export class MenuComponent {

  @Output() menuItemSelected = new EventEmitter<string>();

  items = [
    {
      value: 'home',
      icon: {name:"home", color:'#f6f6f6'},
      label: 'Home',
      hover: false,
    },
    {
      value: 'archive',
      icon: {name:"menu_book", color:'#f6f6f6'},
      label: 'Archivio',
      hover: false,
    },
    {
      value: 'loan',
      icon: {name:"inventory", color:'#f6f6f6'},
      label: 'Prestiti',
      hover: false,
    },
  ];

}
