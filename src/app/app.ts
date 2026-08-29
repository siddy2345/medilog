import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PillLog } from './pill-log/pill-log';

@Component({
  imports: [RouterOutlet, PillLog],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('medilog');
}
