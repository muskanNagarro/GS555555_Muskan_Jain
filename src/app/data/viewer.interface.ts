import { ColDef } from 'ag-grid-community';
export interface salesType { [x: string]: {
    salesUnits: number;
    salesDollars: number;
    gmDollars: number; gmPercent: number; 
}; };

export interface weekRanges {
  [x: string]: string[];
}

export interface storeType {
    storeId: string;
    storeName: string;
    skuId: string;
    skuName: string;
    sales: salesType;
};

export type PlanningRawData = {
  storeId: string;
  skuId: string;
  [key: string]: string | number; 
}

export type RowData = {
  id: string;
  storeId: string;
  skuId: string;
  store: string;
  sku: string;
  price: number;
  cost: number;
  [key: string]: string | number; 
}

export interface ColumnDef extends ColDef {
  children?: ColDef[];
}

export interface store { 
  sno: number; 
  id: string; 
  label: string;
  city: string; 
  state: string 
}

export interface skus { 
  id: string, 
  class: string;
  dept: string; 
  label: string; 
  price: number; 
  cost: number;
}