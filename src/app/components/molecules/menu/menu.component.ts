import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../../atoms';
import { MenuInterface } from '../../../models/interfaces/components.interfaces';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  standalone: true,
  imports: [CommonModule, IconComponent],
})
export class MenuComponent implements MenuInterface, OnInit {
  @Output() menuItemSelected: EventEmitter<string> = new EventEmitter<string>();

  ngOnInit(): void {
    this.selectOption('home');
  }

  items = [
    {
      value: 'home',
      icon: { name: 'home', color: '#f6f6f6' },
      label: 'Home',
      isActive: false,
    },
    {
      value: 'archive',
      icon: { name: 'menu_book', color: '#f6f6f6' },
      label: 'Archivio',
      isActive: false,
    },
    {
      value: 'loan',
      icon: { name: 'inventory', color: '#f6f6f6' },
      label: 'Prestiti',
      isActive: false,
    }
  ];

  selectOption(itemValue: string) {
    // Imposta 'isActive' su 'true' per l'elemento selezionato e su 'false' per tutti gli altri elementi
    this.items.forEach((item) => {
      item.isActive = item.value === itemValue;
    });

    this.menuItemSelected.emit(itemValue);
  }
}
