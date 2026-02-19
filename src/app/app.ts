

import { Component, signal } from '@angular/core';
import { HomeComponent } from './features/home-component/home-component';


@Component({
  selector: 'app-root',
  standalone: true,       // ✅ MUST BE STANDALONE
  imports: [HomeComponent],
  template: `<app-home></app-home>`
})
export class App {
  protected readonly title = signal('dispute-portal');
}
