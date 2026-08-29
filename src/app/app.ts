import { Component, signal } from '@angular/core';
import { PillLog } from './pill-log/pill-log';

@Component({
  imports: [PillLog],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('medilog');
}
