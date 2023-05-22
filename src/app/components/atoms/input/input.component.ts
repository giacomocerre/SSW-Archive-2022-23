import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  standalone: true,
  imports:[IconComponent]
})
export class InputComponent {
  @Input() placeHolder: string = "input placeholder"
  @Output() onChange = new EventEmitter<string>();
}
