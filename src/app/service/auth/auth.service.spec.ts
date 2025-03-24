import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return false for initial authentication status', () => {
    expect(service.getAuthStatus()).toBeFalse();
  });

  it('should log in successfully with correct credentials', () => {
    const result = service.login('admin', 'admin');
    expect(result).toBeTrue();
    expect(service.getAuthStatus()).toBeTrue();
  });

  it('should not log in with incorrect credentials', () => {
    const result = service.login('user', 'wrongpass');
    expect(result).toBeFalse();
    expect(service.getAuthStatus()).toBeFalse();
  });

  it('should log out correctly', () => {
    service.login('admin', 'admin'); // First login
    service.logout(); // Then logout
    expect(service.getAuthStatus()).toBeFalse();
  });
});
