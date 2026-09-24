import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-in-process',
  standalone: true,
  templateUrl: './in-process.component.html',
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class InProcessComponent {
  constructor(private router: Router) {}

  goToHome() {
    this.router.navigate(['/']);
  }
}
