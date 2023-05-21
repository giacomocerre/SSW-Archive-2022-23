import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  standalone: true
})
export class ButtonComponent {
  @Input() label: string;
  @Input() classes: string;
  @Output() onClick: EventEmitter<void> = new EventEmitter<void>();

}
