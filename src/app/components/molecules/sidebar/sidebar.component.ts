import { Component, EventEmitter, Output } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  standalone: true,
  imports: [MenuComponent]
})
export class SidebarComponent {
  @Output() menuItemSelected = new EventEmitter<string>();
}
