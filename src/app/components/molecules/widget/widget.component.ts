import { Component, Input } from '@angular/core';
import { IconComponent } from '../../atoms';
import { WidgetInterface } from '../../../models/interfaces/components.interfaces';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss'],
  standalone: true,
  imports: [IconComponent],
})
export class WidgetComponent implements WidgetInterface{
  @Input() icon;
  @Input() total = 0;
  @Input() measure = 'unit';
  @Input() title = 'widget title';
  @Input() classes = '';
}