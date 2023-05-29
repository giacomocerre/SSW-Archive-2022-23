import { Component, Input } from '@angular/core';
import { IconInterface } from 'src/app/models/interfaces/components.interfaces';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  standalone: true,
})
export class IconComponent {
  @Input() icon: IconInterface;
}