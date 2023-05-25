import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ArchiveComponent, HomeComponent, LoanComponent } from './views';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
  standalone: true,
  imports: [CommonModule, HomeComponent, ArchiveComponent, LoanComponent],
})
export class ViewComponent {
  @Input() view: string;
  @Output() changeView: EventEmitter<string> = new EventEmitter<string>();
}
