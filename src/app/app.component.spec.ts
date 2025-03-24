import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { LeftNavigationComponent } from './left-navigation/left-navigation.component';
import { TopNavigationComponent } from './top-navigation/top-navigation.component';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent, LeftNavigationComponent, TopNavigationComponent], // Declare child components
      imports: [RouterTestingModule] // Mock routing
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the AppComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should render left navigation component', () => {
    const leftNav = fixture.debugElement.query(By.css('app-left-navigation'));
    expect(leftNav).toBeTruthy();
  });

  it('should render top navigation component', () => {
    const topNav = fixture.debugElement.query(By.css('app-top-navigation'));
    expect(topNav).toBeTruthy();
  });

  it('should render router-outlet for dynamic content', () => {
    const routerOutlet = fixture.debugElement.query(By.css('router-outlet'));
    expect(routerOutlet).toBeTruthy();
  });

  it('should set localStorage with initial data on init', () => {
    spyOn(localStorage, 'setItem');

    component.ngOnInit();

    expect(localStorage.setItem).toHaveBeenCalledWith('stores', jasmine.any(String));
    expect(localStorage.setItem).toHaveBeenCalledWith('skus', jasmine.any(String));
    expect(localStorage.setItem).toHaveBeenCalledWith('planning', jasmine.any(String));
  });
});
