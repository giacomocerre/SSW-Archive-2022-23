import { Component, EventEmitter } from '@angular/core';
import { HeaderComponent } from './components/molecules';
import { ArchiveComponent,HomeComponent } from './components/views';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [CommonModule, HeaderComponent, HomeComponent, ArchiveComponent]
})
export class AppComponent {
  selectedMenuItem: string = 'home';
}
