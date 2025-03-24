import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SkuComponent } from './sku.component';
import { skus } from '../data/viewer.interface';

describe('SkuComponent', () => {
  let component: SkuComponent;
  let fixture: ComponentFixture<SkuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SkuComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SkuComponent);
    component = fixture.componentInstance;
    localStorage.clear(); // Ensure clean localStorage before each test
    fixture.detectChanges();
  });

  afterEach(() => {
    localStorage.clear(); // Reset localStorage after each test
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize SKUs from localStorage or default data', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    component.inializeSkus();
    expect(component.skus.length).toBeGreaterThan(0);
    expect(localStorage.getItem).toHaveBeenCalledWith('skus');
  });

  it('should add a SKU when all required fields are filled', () => {
    spyOn(localStorage, 'setItem');

    component.newSKU = { id: 'SKU001', label: 'Test SKU', dept: 'Electronics', class: 'Laptops', price: 1000, cost: 800 };
    component.addSKU();

    expect(component.skus.length).toBe(1);
    expect(localStorage.setItem).toHaveBeenCalled();
    expect(component.newSKU.id).toBe(''); // Ensure form reset
  });

  it('should not add a SKU if required fields are missing', () => {
    spyOn(window, 'alert');

    component.newSKU = { id: '', label: '', dept: '', class: '', price: 0, cost: 0 };
    component.addSKU();

    expect(component.skus.length).toBe(0);
    expect(window.alert).toHaveBeenCalledWith('Please fill in all fields with valid data');
  });

  it('should update a SKU price and cost', () => {
    spyOn(window, 'prompt').and.returnValues('1200', '900');
    spyOn(localStorage, 'setItem');

    component.skus = [{ id: 'SKU001', label: 'Test SKU', dept: 'Electronics', class: 'Laptops', price: 1000, cost: 800 }];
    component.updateSKU(0);

    expect(component.skus[0].price).toBe(1200);
    expect(component.skus[0].cost).toBe(900);
    expect(localStorage.setItem).toHaveBeenCalled();
  });

  it('should delete a SKU when confirmed', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    spyOn(localStorage, 'setItem');

    component.skus = [{ id: 'SKU001', label: 'Test SKU', dept: 'Electronics', class: 'Laptops', price: 1000, cost: 800 }];
    component.deleteSKU(0);

    expect(component.skus.length).toBe(0);
    expect(localStorage.setItem).toHaveBeenCalled();
  });

  it('should not delete a SKU when canceled', () => {
    spyOn(window, 'confirm').and.returnValue(false);

    component.skus = [{ id: 'SKU001', label: 'Test SKU', dept: 'Electronics', class: 'Laptops', price: 1000, cost: 800 }];
    component.deleteSKU(0);

    expect(component.skus.length).toBe(1);
  });
});
