import { Component, Input } from '@angular/core';
import { AddFormComponent, ButtonComponent } from '../../components';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [CommonModule, AddFormComponent, ButtonComponent]
})
export class HeaderComponent {
  @Input() title: string;
  toggleAddForm: boolean = false; // Flag per mostrare o nascondere il modulo aggiungi libro.
}
