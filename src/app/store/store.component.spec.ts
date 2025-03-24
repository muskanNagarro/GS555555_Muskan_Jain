import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreComponent } from './store.component';

describe('StoreComponent', () => {
  let component: StoreComponent;
  let fixture: ComponentFixture<StoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StoreComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(StoreComponent);
    component = fixture.componentInstance;
    localStorage.clear(); // Ensure localStorage is clean before tests
    fixture.detectChanges();
  });

  afterEach(() => {
    localStorage.clear(); // Reset localStorage after each test
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize stores from localStorage or default data', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    component.inializeStore();
    expect(component.stores.length).toBeGreaterThan(0);
    expect(localStorage.getItem).toHaveBeenCalledWith('stores');
  });

  it('should add a store when all fields are filled', () => {
    spyOn(localStorage, 'setItem');

    component.newStore = { sno: 1, id: 'S001', label: 'Test Store', city: 'New York', state: 'NY' };
    component.addStore();

    expect(component.stores.length).toBe(1);
    expect(localStorage.setItem).toHaveBeenCalled();
    expect(component.newStore.id).toBe(''); // Ensure form reset
  });

  it('should not add a store if fields are empty', () => {
    spyOn(window, 'alert');

    component.newStore = { sno: 1, id: '', label: '', city: '', state: '' };
    component.addStore();

    expect(component.stores.length).toBe(0);
    expect(window.alert).toHaveBeenCalledWith('Please fill in all fields');
  });

  it('should update a store name', () => {
    spyOn(window, 'prompt').and.returnValue('Updated Store Name');
    spyOn(localStorage, 'setItem');

    component.stores = [{ sno: 1, id: 'S001', label: 'Old Store', city: 'New York', state: 'NY' }];
    component.updateStore(0);

    expect(component.stores[0].label).toBe('Updated Store Name');
    expect(localStorage.setItem).toHaveBeenCalled();
  });

  it('should delete a store when confirmed', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    spyOn(localStorage, 'setItem');

    component.stores = [{ sno: 1, id: 'S001', label: 'Store A', city: 'New York', state: 'NY' }];
    component.deleteStore(0);

    expect(component.stores.length).toBe(0);
    expect(localStorage.setItem).toHaveBeenCalled();
  });

  it('should not delete a store when canceled', () => {
    spyOn(window, 'confirm').and.returnValue(false);

    component.stores = [{ sno: 1, id: 'S001', label: 'Store A', city: 'New York', state: 'NY' }];
    component.deleteStore(0);

    expect(component.stores.length).toBe(1);
  });
});
