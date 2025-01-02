import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root', // Ensures this guard is available app-wide
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const isLoggedIn = !!localStorage.getItem('authToken'); // Use a descriptive token name
    if (!isLoggedIn) {
      alert('You need to log in to access this page.');
      this.router.navigate(['/login']); // Redirect to login if not authenticated
      return false; // Block navigation
    }
    return true; // Allow navigation if authenticated
  }
}
