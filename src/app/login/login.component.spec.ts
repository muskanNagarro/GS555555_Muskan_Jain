import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']); // Mock Router

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [FormsModule], // Required for ngModel
      providers: [{ provide: Router, useValue: routerSpy }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should show error message if fields are empty', () => {
    component.username = '';
    component.password = '';
    component.onSubmit();
    expect(component.errorMessage).toBe('Please enter both username and password.');
  });

  it('should show error message for invalid credentials', fakeAsync(() => {
    component.username = 'wrongUser';
    component.password = 'wrongPass';
    component.onSubmit();
    
    expect(component.isLoading).toBeTrue();
    tick(2000); // Simulate delay
    expect(component.isLoading).toBeFalse();
    expect(component.errorMessage).toBe('Invalid username or password. Please try again.');
  }));

  it('should log in successfully with correct credentials', fakeAsync(() => {
    component.username = 'admin';
    component.password = 'admin';
    component.onSubmit();
    
    expect(component.isLoading).toBeTrue();
    tick(2000); // Simulate delay
    expect(component.isAuthenticated).toBeTrue();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/dashboard']);
  }));

  it('should navigate to login on logout', () => {
    component.logout();
    expect(component.isAuthenticated).toBeFalse();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });
});
