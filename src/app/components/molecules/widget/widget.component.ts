import { Component, Input } from '@angular/core';
import { IconInterface, WidgetInterface } from '../../../types/interfaces';
import { IconComponent } from '../../atoms';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss'],
  standalone: true,
  imports: [IconComponent],
})
export class WidgetComponent implements WidgetInterface{
  @Input() icon!: IconInterface;
  @Input() total: number = 0;
  @Input() measure: string = 'unit';
  @Input() title: string = 'widget title';
  @Input() classes: string = '';
}