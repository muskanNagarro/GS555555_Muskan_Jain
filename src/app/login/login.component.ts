import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: false,
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  isAuthenticated: boolean = false; // Keep track of user's authentication state
  isLoading: boolean = false;
  errorMessage: string | null = null;

  constructor(private router: Router) {}

  // Method to simulate login functionality
  onSubmit(): void {
    if (!this.username || !this.password) {
      this.errorMessage = 'Please enter both username and password.';
      return;
    }

    // Show loading state
    this.isLoading = true;

    // Simulate a login process (you can replace this with an actual authentication service)
    setTimeout(() => {
      // Simulate successful login (you can replace this with your authentication logic)
      if (this.username === 'admin' && this.password === 'pass1234') {
        this.isAuthenticated = true; // Set user as authenticated
        this.isLoading = false;
        this.router.navigate(['/dashboard']); // Navigate to dashboard after successful login
      } else {
        this.isLoading = false;
        this.errorMessage = 'Invalid username or password. Please try again.';
      }
    }, 2000); // Simulating a 2-second delay for authentication
  }

  // Method to handle logout
  logout(): void {
    this.isAuthenticated = false; // Set user as not authenticated
    this.router.navigate(['/login']); // Navigate to login page
  }
}
