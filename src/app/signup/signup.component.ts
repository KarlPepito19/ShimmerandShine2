import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  imports: [FormsModule]
})
export class SignupComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  submitted: boolean = false;

  constructor(private router: Router) {}

  onSubmit() {
    this.submitted = true; // 🔥 Mark as submitted

    if (!this.name || !this.email || !this.password) {
      console.error('All fields are required.');
      return;
    }

    console.log('Name:', this.name);
    console.log('Email:', this.email);
    console.log('Password:', this.password);

    this.router.navigate(['/login']);
  }
}
