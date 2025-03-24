import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TopNavigationComponent } from './top-navigation.component';
import { provideRouter, Router } from '@angular/router';
import { Location } from '@angular/common';
import { fakeAsync, tick } from '@angular/core/testing';

describe('TopNavigationComponent', () => {
  let component: TopNavigationComponent;
  let fixture: ComponentFixture<TopNavigationComponent>;
  let router: Router;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TopNavigationComponent],
      providers: [
        provideRouter([
          { path: 'store', loadComponent: () => import('../store/store.component').then(m => m.StoreComponent) },
          { path: 'login', loadComponent: () => import('../login/login.component').then(m => m.LoginComponent) }
        ]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TopNavigationComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    spyOn(router, 'navigate').and.callThrough(); // Spy on Router navigation
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with user authentication state from local storage', () => {
    localStorage.setItem('username', 'testUser');
    component.ngOnInit();
    expect(component.isAuthenticated).toBeTrue();
    expect(component.username).toBe('testUser');
  });

  it('should login and navigate to store page', fakeAsync(() => {
    component.login();
    tick(); // Simulate async behavior
    expect(component.isAuthenticated).toBeTrue();
    expect(component.username).toBe('admin');
    expect(localStorage.getItem('username')).toBe('admin');
    expect(router.navigate).toHaveBeenCalledWith(['/store']);
  }));

  it('should logout and navigate to login page', fakeAsync(() => {
    component.logout();
    tick(); // Simulate async behavior
    expect(component.isAuthenticated).toBeFalse();
    expect(component.username).toBe('');
    expect(localStorage.getItem('username')).toBeNull();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  }));

  afterEach(() => {
    localStorage.clear(); // Clean up local storage after each test
  });
});
