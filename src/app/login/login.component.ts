import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  credentials = { username: '', password: '' };

  constructor(private apiService: ApiService, private router: Router) {}

  async login() {
    try {
      const response = await this.apiService.login(this.credentials);
      alert('Login successful!');
      this.router.navigate(['/cart']); // Redirect to cart after login
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please check your username and password.');
    }
  }
}
