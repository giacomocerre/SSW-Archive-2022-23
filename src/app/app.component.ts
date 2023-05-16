import { Component } from '@angular/core';
import { HeaderComponent } from './components/molecules';
import { ArchiveComponent,HomeComponent } from './components/views';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [HeaderComponent, HomeComponent, ArchiveComponent]
})
export class AppComponent {
}
