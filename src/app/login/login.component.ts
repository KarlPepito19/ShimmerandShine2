import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule, RouterModule],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  error: string = '';

  constructor(private router: Router) {}

  onSubmit() {
    // Retrieve user data from local storage
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      this.error = 'No user found. Please sign up first.';
      return;
    }

    const user = JSON.parse(storedUser);

    // Verify credentials
    if (this.username === user.email && this.password === user.password) {
      console.log('Login successful:', this.username);
      // Navigate to home component
      this.router.navigate(['/home']);
    } else {
      this.error = 'Invalid email or password.';
    }
  }
}