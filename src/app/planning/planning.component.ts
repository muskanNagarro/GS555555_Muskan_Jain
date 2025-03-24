import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ColumnDef, PlanningRawData, RowData, salesType, skus, store, storeType, weekRanges } from '../data/viewer.interface';
import { GridApi, GridOptions, GridReadyEvent } from 'ag-grid-community';
import { RowDataService } from '../service/row-data/row-data.service';

@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  standalone: false,
  styleUrls: ['./planning.component.scss']
})
export class PlanningComponent implements OnInit {
  // List of months and their corresponding weeks
  months: string[] = ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'];
  weekRanges: weekRanges = {
    'Feb': ['W01', 'W02', 'W03', 'W04'],
    'Mar': ['W05', 'W06', 'W07', 'W08', 'W09'],
    'Apr': ['W10', 'W11', 'W12', 'W13'],
    'May': ['W14', 'W15', 'W16', 'W17'],
    'Jun': ['W18', 'W19', 'W20', 'W21', 'W22'],
    'Jul': ['W23', 'W24', 'W25', 'W26'],
    'Aug': ['W27', 'W28', 'W29', 'W30'],
    'Sep': ['W31', 'W32', 'W33', 'W34', 'W35'],
    'Oct': ['W36', 'W37', 'W38', 'W39'],
    'Nov': ['W40', 'W41', 'W42', 'W43'],
    'Dec': ['W44', 'W45', 'W46', 'W47', 'W48'],
    'Jan': ['W49', 'W50', 'W51', 'W52']
  };
  weekLabel: {[x: string]: string;} = {
    'W01': 'Week 01', 
    'W02': 'Week 02', 
    'W03': 'Week 03', 
    'W04': 'Week 04', 
    'W05': 'Week 05', 
    'W06': 'Week 06', 
    'W07': 'Week 07', 
    'W08': 'Week 08', 
    'W09': 'Week 09', 
    'W10': 'Week 10', 
    'W11': 'Week 11', 
    'W12': 'Week 12', 
    'W13': 'Week 13', 
    'W14': 'Week 14', 
    'W15': 'Week 15', 
    'W16': 'Week 16', 
    'W17': 'Week 17', 
    'W18': 'Week 18', 
    'W19': 'Week 19', 
    'W20': 'Week 20', 
    'W21': 'Week 21', 
    'W22': 'Week 22', 
    'W23': 'Week 23', 
    'W24': 'Week 24', 
    'W25': 'Week 25', 
    'W26': 'Week 26', 
    'W27': 'Week 27', 
    'W28': 'Week 28', 
    'W29': 'Week 29', 
    'W30': 'Week 30', 
    'W31': 'Week 31', 
    'W32': 'Week 32', 
    'W33': 'Week 33', 
    'W34': 'Week 34', 
    'W35': 'Week 35', 
    'W36': 'Week 36', 
    'W37': 'Week 37', 
    'W38': 'Week 38', 
    'W39': 'Week 39', 
    'W40': 'Week 40', 
    'W41': 'Week 41', 
    'W42': 'Week 42', 
    'W43': 'Week 43', 
    'W44': 'Week 44', 
    'W45': 'Week 45', 
    'W46': 'Week 46', 
    'W47': 'Week 47', 
    'W48': 'Week 48', 
    'W49': 'Week 49', 
    'W50': 'Week 50', 
    'W51': 'Week 51', 
    'W52': 'Week 52' 
  };

  columnDefs: ColumnDef[] = [
    { field: 'store', headerName: 'Store', rowDrag: false, width: 150 },
    { field: 'sku', headerName: 'SKU', rowDrag: false, width: 200 },
    ...this.generateColumns()
  ];

  defaultColDef = { flex: 1, sortable: true, filter: true, resizable: true, suppressMovable: true, minWidth: 120 };
  storesData = JSON.parse(localStorage.getItem('stores') || '[]');
  skuData = JSON.parse(localStorage.getItem('skus') || '[]');

  planningData: PlanningRawData[] = JSON.parse(localStorage.getItem('planning') || '[]');
  rowData: RowData[] = JSON.parse(localStorage.getItem('rowData') || '[]');
  isLoading: boolean = false;
  processingTime: number | null = null;
  private gridApi!: GridApi; 

  gridOptions: GridOptions = {
    defaultColDef: { sortable: true, filter: true, resizable: true },
    animateRows: true,
    getRowId: (params: any) => `${params.data.storeId}_${params.data.skuId}`
  };
  constructor(private cdr: ChangeDetectorRef, private rowDataService: RowDataService) {}

  ngOnInit() {
    this.isLoading = true;
    this.rowData = []; // Clear initial data
    const mergedDataMap = new Map<string, any>();
    this.planningData.forEach((data) => {
      const rowId = `${data.storeId}_${data.skuId}`;

      if (!mergedDataMap.has(rowId)) {
        mergedDataMap.set(rowId, { ...data }); // Store initial row
      } else {
        Object.assign(mergedDataMap.get(rowId), data); // Merge properties
      }
    });

    const mergedPlanningData = Array.from(mergedDataMap.values());

    this.rowDataService.getPlanningData(mergedPlanningData, this.storesData, this.skuData)
    .then(() => {
      this.isLoading = false; // Hide loader when done
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      this.isLoading = false;
    });
  }

  generateColumns(): ColumnDef[] {
    let columns: ColumnDef[] = [];
    this.months.forEach(month => {
      let children = this.weekRanges[month].map(week => ({
        headerName: this.weekLabel[week],
        children: [
          { field: `${week}_salesUnits`, headerName: 'Sales Units', editable: true },
          { field: `${week}_salesDollars`, headerName: 'Sales Dollars', valueGetter: (params: { data: { [x: string]: number; price: number; }; }) => `$ ${((params.data[`${week}_salesUnits`] ?? 0) * params.data.price).toFixed(2)}` },
          { field: `${week}_gmDollars`, headerName: 'GM Dollars', valueGetter: (params: { data: { [x: string]: number; price: number; cost: number; }; }) => `$ ${(((params.data[`${week}_salesUnits`] ?? 0) * params.data.price) - ((params.data[`${week}_salesUnits`] ?? 0) * params.data.cost)).toFixed(2)}` },
          { field: `${week}_gmPercent`, headerName: 'GM Percent', valueGetter: (params: { data: { [x: string]: number; price: number; cost: number; }; }) => {
              let gmDollars = ((params.data[`${week}_salesUnits`] ?? 0) * params.data.price) - ((params.data[`${week}_salesUnits`] ?? 0) * params.data.cost);
              let salesDollars = (params.data[`${week}_salesUnits`] ?? 0) * params.data.price;
              return salesDollars ? `${((gmDollars / salesDollars) * 100).toFixed(2)}%` : '0%';
            },
            cellStyle: (params: { value: string; }) => {
              let value = parseFloat(params.value);
              if (value >= 40) return { backgroundColor: 'green', color: 'white' };
              if (value >= 10) return { backgroundColor: 'yellow' };
              if (value > 5) return { backgroundColor: 'orange' };
              return { backgroundColor: 'red', color: 'white' };
            }
          }
        ]
      }));
      columns.push({ headerName: month, children });
    });
    return columns;
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api; 
    this.gridApi.sizeColumnsToFit();
    this.rowDataService.setGridApi(this.gridApi);
  }
}
