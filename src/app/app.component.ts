import { Component } from '@angular/core';
import { HeaderComponent, ViewComponent } from './layout';
import { ArchiveService } from './services/archive.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [HeaderComponent, ViewComponent],
  providers: [ArchiveService]
})
export class AppComponent {}
