import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import { IconInterface, InputInterface } from '../../models/interfaces/components.interfaces';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  standalone: true,
  imports:[CommonModule, IconComponent]
})
export class InputComponent implements InputInterface{
  @Input() placeholder: string = "input placeholder";
  @Input() isRequired: boolean = false;
  @Input() icon: IconInterface;
  @Output() onChange = new EventEmitter<string>();
}