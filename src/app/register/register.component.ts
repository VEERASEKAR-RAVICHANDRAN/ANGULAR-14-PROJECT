import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../app.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  user = {
    username: '',
    password: '',
    email: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    dateOfBirth: '',
  };

  constructor(private apiService: ApiService, private router: Router) {}

  async register() {
    console.log('User registered:', this.user);
    try {
      const response = await this.apiService.register(this.user);
      alert('Registration successful! Please log in.');
      this.router.navigate(['/login']); // Redirect to login after registration
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Registration failed. Please check your inputs and try again.');
    }
  }
}
