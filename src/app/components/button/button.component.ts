import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import { IconInterface, LabelInterface } from '../../models/interfaces/components.interfaces';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  standalone: true,
  imports: [CommonModule, IconComponent],
})
export class ButtonComponent {
  @Input() label: LabelInterface; // stabilisce il valore della label del button ed eventualmente se ha un icona
  @Input() classes: string;
  @Input() icon: IconInterface;
  @Output() click = new EventEmitter();
}
