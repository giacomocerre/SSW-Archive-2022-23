import { Component, Input } from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import { WidgetInterface } from 'src/app/models/interfaces/components.interfaces';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss'],
  standalone: true,
  imports: [IconComponent]
})
export class WidgetComponent {
  @Input() widget: WidgetInterface;
}
