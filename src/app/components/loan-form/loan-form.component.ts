import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InputComponent } from '../input/input.component';
import { IconComponent } from '../icon/icon.component';
import { ArchiveService } from 'src/app/services/archive.service';
import { ButtonComponent } from '../button/button.component';
import { ActionStatusInterface } from 'src/app/models/interfaces/classes.interfaces';
import { MessageComponent } from '../message/message.component';

@Component({
  selector: 'app-loan-form',
  templateUrl: './loan-form.component.html',
  styleUrls: ['./loan-form.component.scss'],
  standalone: true,
  imports: [CommonModule, InputComponent, IconComponent, ButtonComponent, MessageComponent]
})
export class LoanFormComponent {
  @Input() id: string;
  @Output() closeLoan = new EventEmitter<boolean>();
  name: string;
  surname: string;
  message: ActionStatusInterface;

  constructor(private archiveService: ArchiveService){}

  save(){
    this.message = this.archiveService.onLoanAction(this.id,'borrow',{name:this.name, surname: this.surname});
  }
  
}
