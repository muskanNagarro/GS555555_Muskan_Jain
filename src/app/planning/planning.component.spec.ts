import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { PlanningComponent } from './planning.component';
import { ChangeDetectorRef } from '@angular/core';
import { GridReadyEvent } from 'ag-grid-community';
import { RowDataService } from '../service/row-data/row-data.service';

describe('PlanningComponent', () => {
  let component: PlanningComponent;
  let fixture: ComponentFixture<PlanningComponent>;
  let rowDataService: jasmine.SpyObj<RowDataService>;

  beforeEach(async () => {
    const rowDataServiceSpy = jasmine.createSpyObj('RowDataService', ['getPlanningData', 'setGridApi']);

    await TestBed.configureTestingModule({
      declarations: [PlanningComponent],
      providers: [
        ChangeDetectorRef,
        { provide: RowDataService, useValue: rowDataServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PlanningComponent);
    component = fixture.componentInstance;
    rowDataService = TestBed.inject(RowDataService) as jasmine.SpyObj<RowDataService>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize and merge data correctly', fakeAsync(() => {
    const mockPlanningData = [
      { storeId: 'ST001', skuId: 'SK001', W01_salesUnits: 100 },
      { storeId: 'ST001', skuId: 'SK001', W02_salesUnits: 200 }
    ];
    
    localStorage.setItem('planning', JSON.stringify(mockPlanningData));
    rowDataService.getPlanningData.and.returnValue(Promise.resolve());

    component.ngOnInit();
    tick(); // Simulates async operations

    expect(component.isLoading).toBeFalse();
    expect(rowDataService.getPlanningData).toHaveBeenCalled();
  }));

  it('should generate correct column definitions', () => {
    const columns = component.generateColumns();
    expect(columns.length).toBeGreaterThan(0);
    expect(columns.some(col => col.headerName === 'Feb')).toBeTrue();
  });

  it('should set grid API on grid ready', () => {
    const mockGridApi = jasmine.createSpyObj('GridApi', ['sizeColumnsToFit']);
    const mockGridReadyEvent = { api: mockGridApi } as GridReadyEvent; // 👈 Ensure correct type
  
    component.onGridReady(mockGridReadyEvent);
  
    expect(component['gridApi']).toBe(mockGridApi);
    expect(mockGridApi.sizeColumnsToFit).toHaveBeenCalled();
    expect(rowDataService.setGridApi).toHaveBeenCalledWith(mockGridApi);
  });
  
});
