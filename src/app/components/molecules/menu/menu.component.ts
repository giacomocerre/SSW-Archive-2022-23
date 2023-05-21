import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../../atoms';
import { MenuInterface } from '../../../models/interfaces/components.interfaces';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  standalone: true,
  imports: [CommonModule, IconComponent]
})
export class MenuComponent implements MenuInterface{

  @Output() menuItemSelected = new EventEmitter<string>();

  items = [
    {
      value: 'home',
      icon: {name:"home", color:'#f6f6f6'},
      label: 'Home',
    },
    {
      value: 'archive',
      icon: {name:"menu_book", color:'#f6f6f6'},
      label: 'Archivio',
    },
    {
      value: 'loan',
      icon: {name:"inventory", color:'#f6f6f6'},
      label: 'Prestiti',
    },
  ];

}
