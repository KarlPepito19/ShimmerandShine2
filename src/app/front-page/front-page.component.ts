import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-front-page',
  standalone: true,
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.css']
})
export class FrontPageComponent {
  constructor(private router: Router) {}

  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToSignup() {
    this.router.navigate(['/signup']);
  }
}
