import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LeftNavigationComponent } from './left-navigation.component';
import { provideRouter } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('LeftNavigationComponent', () => {
  let component: LeftNavigationComponent;
  let fixture: ComponentFixture<LeftNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LeftNavigationComponent],
      providers: [provideRouter([])]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the logo', () => {
    const logoElement = fixture.debugElement.query(By.css('.logo img'));
    expect(logoElement).toBeTruthy();
    expect(logoElement.nativeElement.getAttribute('src')).toContain('assets/logo.svg');
  });

  it('should have navigation links', () => {
    const links = fixture.debugElement.queryAll(By.css('.nav-links a'));
    expect(links.length).toBe(3);
    expect(links[0].nativeElement.textContent).toContain('Store');
    expect(links[1].nativeElement.textContent).toContain('SKU');
    expect(links[2].nativeElement.textContent).toContain('Planning');
  });

  it('should have the correct router links', () => {
    const links = fixture.debugElement.queryAll(By.css('.nav-links a'));
    expect(links[0].nativeElement.getAttribute('routerLink')).toBe('/store');
    expect(links[1].nativeElement.getAttribute('routerLink')).toBe('/sku');
    expect(links[2].nativeElement.getAttribute('routerLink')).toBe('/planning');
  });

  it('should have a footer with company name', () => {
    const footer = fixture.debugElement.query(By.css('.nav-footer'));
    expect(footer.nativeElement.textContent).toContain('© 2025 Company Name');
  });
});
