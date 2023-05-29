import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import { CommonModule } from '@angular/common';
import { ButtonInterface, LabelInterface } from '../../models/interfaces/components.interfaces';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  standalone: true,
  imports:[CommonModule, IconComponent]
})
export class ButtonComponent {
  @Input() label: LabelInterface;
  @Input() classes: string;
  @Input() icon;
  @Output() click = new EventEmitter();
}
