import { Component } from '@angular/core';
import { ViewComponent } from './components/view/view.component';
import { SidebarComponent } from './components/molecules';
import { ArchiveComponent } from './components/view/views';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [SidebarComponent, ViewComponent],
})
export class AppComponent {
  view: string = 'home';
}
