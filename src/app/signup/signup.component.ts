import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  imports: [FormsModule, RouterModule],
})
export class SignupComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = ''; // New property for confirm password
  submitted: boolean = false;

  constructor(private router: Router) {}

  onSubmit() {
    this.submitted = true;

    // Check if all fields are filled and passwords match
    if (!this.name || !this.email || !this.password || !this.confirmPassword) {
      console.error('All fields are required.');
      return;
    }

    if (this.password !== this.confirmPassword) {
      console.error('Passwords do not match.');
      return;
    }

    // Store user data in local storage
    const user = { name: this.name, email: this.email, password: this.password };
    localStorage.setItem('user', JSON.stringify(user));

    console.log('Name:', this.name);
    console.log('Email:', this.email);
    console.log('Password:', this.password);

    // Navigate to login page
    this.router.navigate(['/login']);
  }
}