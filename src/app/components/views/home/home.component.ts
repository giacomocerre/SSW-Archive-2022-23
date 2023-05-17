import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { forkJoin } from 'rxjs';
import { RemoteDatabaseService } from '../../../services/remote-db.service';
import { ButtonComponent } from '../../atoms';
import { WidgetComponent, BookCardComponent } from '../../molecules';
import { Book } from '../../../types/classes';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  providers: [RemoteDatabaseService],
  imports:[CommonModule, HttpClientModule, ButtonComponent, WidgetComponent, BookCardComponent]
})
export class HomeComponent implements OnInit{
  @Output() menuItemSelected = new EventEmitter<string>();
  totalBooks: number = 0;
  totalOnLoan: number = 0;
  lastBooks: Book[] = [];

  constructor(private db: RemoteDatabaseService){}

  ngOnInit() {
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
      next: (data: Book[]) => {
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
