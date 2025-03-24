import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated: boolean = false;

  constructor() {}

  // Check the current authentication status
  getAuthStatus(): boolean {
    return this.isAuthenticated;
  }

  // Simulate login function
  login(username: any, password: any): boolean {
    // Example logic: If username is 'admin' and password is 'admin'
    if (username === 'admin' && password === 'admin') {
      this.isAuthenticated = true;
      return true;
    }
    return false;
  }

  // Logout function
  logout(): void {
    this.isAuthenticated = false;
  }
}
