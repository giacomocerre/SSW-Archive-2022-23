import { Component, Input } from '@angular/core';
import { IconInterface } from '../../../types';

const baseIcon = {
  name: 'home',
  classes: '',
  width: 35,
  height: 35,
  color: 'red',
  bgColor: 'none'

}

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  standalone: true,
})
export class IconComponent {
  @Input() icon: IconInterface = baseIcon;
}