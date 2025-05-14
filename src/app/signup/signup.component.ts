import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  imports: [FormsModule, RouterModule], // Add RouterModule
})
export class SignupComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  submitted: boolean = false;

  constructor(private router: Router) {}

  onSubmit() {
    this.submitted = true;

    if (!this.name || !this.email || !this.password) {
      console.error('All fields are required.');
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