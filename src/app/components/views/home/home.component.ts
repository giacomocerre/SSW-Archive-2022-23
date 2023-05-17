import { HttpClientModule } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RemoteDatabaseService } from 'src/app/services/remote-db.service';
import { ButtonComponent } from '../../atoms';
import { WidgetComponent } from '../../molecules/widget/widget.component';
import { BookInterface } from 'src/app/types';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  providers: [RemoteDatabaseService],
  imports:[HttpClientModule, ButtonComponent, WidgetComponent]
})
export class HomeComponent implements OnInit{
  @Output() menuItemSelected = new EventEmitter<string>();
  totalBooks: number = 0;
  totalOnLoan: number = 0;
  lastBooks: BookInterface[] = [];

  constructor(private db: RemoteDatabaseService){}

  ngOnInit(): void {

    forkJoin([
      this.getBooksCount('total'),
      this.getBooksCount('onLoan'),
    ]).subscribe({
      next: (data: number[]) => {
        this.totalBooks = data[0];
        this.totalOnLoan = data[1];
      },
      error: (err: Error) => {
        console.log('Get Archive Error (getBooksCount):' + err);
      },
    });

    //Recupera i 5 ultimi libri inseriti
    this.db.getLastAddedBooks().subscribe({
      next: (data: BookInterface[]) => {
        this.lastBooks = data;
      },
      error: (err: Error) => {
        console.log('Get Archive Error (getLastBook):' + err);
      },
    });

  }

  getBooksCount(input: string) {
    return this.db.getBookCount(input);
  }

}
