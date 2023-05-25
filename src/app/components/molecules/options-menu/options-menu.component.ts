import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IconComponent, MessageComponent } from '../../atoms';
import { ArchiveService } from '../../../services/archive.service';
import { MenuInterface, MenuItem } from '../../../models/interfaces/components.interfaces';

@Component({
  selector: 'app-options-menu',
  templateUrl: './options-menu.component.html',
  styleUrls: ['./options-menu.component.scss'],
  standalone: true,
  imports: [CommonModule, IconComponent, MessageComponent],
})
export class OptionsMenuComponent implements MenuInterface {
  @Input() visible: boolean = false;
  @Input() id: string;
  @Input() loan: boolean = true;
  @Output() selectedOption = new EventEmitter<{type:string, id:string}>();
  message: {status:boolean, message:string} = {status: false, message:''};

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
        this.selectedOption.emit({type:'single', id: this.id});
      },
    },
    {
      label: 'Gestisci Prestito',
      value: 'loan',
      icon: {
        name: 'autorenew',
        color: '222',
        size: 20,
      },
      action: () => {
        this.selectedOption.emit({type:'loan', id:this.id});
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
      isActive: !this.loan,
      action: () => {
        this.loan ? this.showMessage('Impossibile Eliminare (Libro in prestito)') : this.archiveService.removeBookFromArchive(this.id);
      },
    },
  ];

  showMessage(input: string) {
    this.message.message = input;
    this.message.status = true;
    setInterval(() => {
      this.message = {status: false, message:''}
    }, 5000)
  }

  handlerOption(item: MenuItem) {
    item.action();
  }
}
