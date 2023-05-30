import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Book } from 'src/app/models/classes';
import { IconComponent } from '../icon/icon.component';
import { ButtonComponent } from '../button/button.component';
import { LoanFormComponent } from '../loan-form/loan-form.component';
import { ArchiveService } from 'src/app/services/archive.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss'],
  standalone: true,
  imports: [CommonModule, IconComponent, ButtonComponent, LoanFormComponent]
})
export class ArchiveComponent {
  @Input() books: Book[];
  book: Book;
  showLoan: boolean = false;
  showSingle: boolean = false;
  selectedID: string;

  constructor(private archiveService: ArchiveService){}

  removeBook(id:string) {
    this.selectedID = id;
    this.archiveService.removeBookFromArchive(id);
  }

  viewLoan(id:string, onLoan:boolean){
    this.selectedID = id;
    if(onLoan){
      this.archiveService.onLoanAction(id, 'return');
    }else{
      this.showLoan = true;
    }
  }

}
