import { Component } from '@angular/core';
import { OpenerComponent } from 'src/app/components/atoms';

@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.scss'],
  standalone: true,
  imports: [OpenerComponent]
})
export class LoanComponent {}
