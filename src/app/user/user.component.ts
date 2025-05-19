import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  name: string = '';
  email: string = '';
  location: string = '';
  number: string = '';
  submitted: boolean = false;

  ngOnInit() {
    // Retrieve user data from local storage
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      this.name = user.name || '';
      this.email = user.email || '';
    }
  }
  constructor(private router: Router) {}
  onHome(){
    this.router.navigate(['/home']);
  }

  onSave() {
    this.submitted = true;

    if (!this.location || !this.number) {
      console.error('Location and Number are required.');
      return;
    }

    // Update user data with location and number
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      user.location = this.location;
      user.number = this.number;
      localStorage.setItem('user', JSON.stringify(user));
      console.log('User details saved:', user);
    }
  }

}