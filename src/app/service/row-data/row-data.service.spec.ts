import { TestBed } from '@angular/core/testing';
import { RowDataService } from './row-data.service';
import { GridApi } from 'ag-grid-community';
import { RowData } from '../../data/viewer.interface';

describe('RowDataService', () => {
  let service: RowDataService;
  let mockGridApi: jasmine.SpyObj<GridApi>;

  beforeEach(() => {
    // Create a mock for GridApi
    mockGridApi = jasmine.createSpyObj('GridApi', ['applyTransactionAsync', 'forEachNode']);

    TestBed.configureTestingModule({
      providers: [RowDataService],
    });

    service = TestBed.inject(RowDataService);
    service.setGridApi(mockGridApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set the grid API', () => {
    const newGridApi = jasmine.createSpyObj('GridApi', ['applyTransactionAsync']);
    service.setGridApi(newGridApi);
    expect(service['gridApi']).toBe(newGridApi);
  });

  it('should process planning data with web worker', async () => {
    spyOn(service['worker'], 'postMessage').and.callThrough();

    const mockPlanningData = [{ id: 1 }];
    const mockStoresData = [{ id: 'Store1' }];
    const mockSkuData = [{ id: 'SKU1' }];

    await service.getPlanningData(mockPlanningData, mockStoresData, mockSkuData);

    expect(service['worker'].postMessage).toHaveBeenCalledWith({
      planningData: mockPlanningData,
      storesData: mockStoresData,
      skuData: mockSkuData,
    });
  });

  it('should append chunk of data to the grid correctly', () => {
    const mockUpdatedData: RowData[] = [
      {
          storeId: 'Store1', skuId: 'SKU1', data: 'UpdatedData1',
          id: '',
          store: '',
          sku: '',
          price: 0,
          cost: 0
      },
      {
          storeId: 'Store2', skuId: 'SKU2', data: 'NewData2',
          id: '',
          store: '',
          sku: '',
          price: 0,
          cost: 0
      },
    ];
  
    // Simulate existing nodes with both node and index parameters
    mockGridApi.forEachNode.and.callFake((callback: (node: any, index: number) => void) => {
      callback({ id: 'Store1_SKU1' }, 0);
    });
  
    service.appendChunkToGrid(mockUpdatedData);
  
    expect(mockGridApi.applyTransactionAsync).toHaveBeenCalledWith({
      update: [{ storeId: 'Store1', skuId: 'SKU1', data: 'UpdatedData1' }],
    });
  
    expect(mockGridApi.applyTransactionAsync).toHaveBeenCalledWith({
      add: [{ storeId: 'Store2', skuId: 'SKU2', data: 'NewData2' }],
    });
  });

  it('should not append data if gridApi is not set', () => {
    service['gridApi'] = undefined as any; // Simulating an undefined gridApi
    service.appendChunkToGrid([{
        storeId: 'Store1', skuId: 'SKU1', data: 'Test',
        id: '',
        store: '',
        sku: '',
        price: 0,
        cost: 0
    }]);

    expect(mockGridApi.applyTransactionAsync).not.toHaveBeenCalled();
  });
});
