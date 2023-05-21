import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MessageInterface } from '../../../models/interfaces/components.interfaces';


@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class MessageComponent {
  @Input() message: MessageInterface;
}
