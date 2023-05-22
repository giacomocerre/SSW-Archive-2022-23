import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IconComponent } from '../../atoms';
import { ArchiveService } from '../../../services/archive.service';
import { MenuInterface } from '../../../models/interfaces/components.interfaces';

@Component({
  selector: 'app-options-menu',
  templateUrl: './options-menu.component.html',
  styleUrls: ['./options-menu.component.scss'],
  standalone: true,
  imports: [CommonModule, IconComponent],
})
export class OptionsMenuComponent implements MenuInterface {
  @Input() visible: boolean = false;
  @Input() id: string;
  @Output() selectedOption = new EventEmitter<string>();

  constructor(private archiveService: ArchiveService) {}

  items = [
    {
      label: 'Vedi Scheda',
      value: 'single',
      icon: {
        name: 'description',
        color: '#222',
        size: 20,
      },
      action: () => {
        this.selectedOption.emit('single');
      },
    },
    {
      label: 'Rimuovi',
      value: 'remove',
      icon: {
        name: 'delete',
        color: 'red',
        size: 20,
      },
      action: () => {
        this.archiveService.removeBookFromArchive(this.id);
      },
    },
  ];

  handlerOption(item: any) {
    item.action();
  }
}
