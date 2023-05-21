import { Component, Input } from '@angular/core';
import { OpenerInterface } from '../../../models/interfaces/components.interfaces';

@Component({
  selector: 'app-opener',
  templateUrl: './opener.component.html',
  styleUrls: ['./opener.component.scss'],
  standalone: true,
})
export class OpenerComponent implements OpenerInterface{
  @Input() title = 'Titolo di prova';
  @Input() description = 'Descrizione di prova';
}
