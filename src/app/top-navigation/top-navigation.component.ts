import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-navigation',
  templateUrl: './top-navigation.component.html',
  standalone: false,
  styleUrls: ['./top-navigation.component.scss']
})
export class TopNavigationComponent implements OnInit {
  isAuthenticated: boolean = false; // Authentication state
  username: string = ''; // Store the username

  constructor(private router: Router) {}

  ngOnInit(): void {
    // For example, you could check local storage or a service to determine if the user is logged in
    const storedUser = localStorage.getItem('username');
    if (storedUser) {
      this.isAuthenticated = true;
      this.username = storedUser;
    }
  }

  // Simulate login action
  login(): void {
    // Set a mock username upon successful login
    this.username = 'admin'; // Replace with the actual username from a login form or API
    this.isAuthenticated = true;
    localStorage.setItem('username', this.username); // Store username for future reference
    this.router.navigate(['/store']); // Navigate to the dashboard or any other page
  }

  // Logout action
  logout(): void {
    this.isAuthenticated = false;
    this.username = '';
    localStorage.removeItem('username'); // Clear the stored username
    this.router.navigate(['/login']); // Navigate to the login page
  }
}
