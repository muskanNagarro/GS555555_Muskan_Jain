import { Injectable } from "@angular/core";
import { GridApi } from "ag-grid-community";
import { RowData } from "../../data/viewer.interface";
@Injectable({
    providedIn: 'root'
  })
export class RowDataService {
    private worker!: Worker;
    private gridApi!: GridApi;
  
    constructor() {
      if (typeof Worker !== 'undefined') {
        this.worker = new Worker(new URL('../../row-data-worker/row-data.worker', import.meta.url), { type: 'module' });
      }
    }
  
    setGridApi(api: GridApi) {
      this.gridApi = api;
    }
  
    getPlanningData(planningData: any[], storesData: any[], skuData: any[]): Promise<void> {
      return new Promise((resolve, reject) => {
        this.worker.onmessage = (event: any) => {
          if (event.data.chunk) {
            console.log(`Processing chunk of size: ${event.data.chunk.length}`);
            console.log('chunk of size: ', JSON.stringify(event.data.chunk));
            this.appendChunkToGrid(event.data.chunk); 
          } else if (event.data.progress !== undefined) {
            console.log(`Loading Progress: ${event.data.progress.toFixed(2)}%`);
          } else if (event.data.done) {
            console.log('All data loaded.');
            resolve();
          }
        };
  
        this.worker.onerror = (error: any) => reject(error);
  
        this.worker.postMessage({ planningData, storesData, skuData });
      });
    }
  
    appendChunkToGrid(updatedData: RowData[]) {
      if (!this.gridApi) return;

      const existingNodes = new Map<string, any>(); // Store existing row IDs for quick lookup
    
      // Get all current row nodes from the grid
      this.gridApi.forEachNode((node: any) => {
        existingNodes.set(node.id, node);
      });
    
      const updateChunk: RowData[] = [];
      const addChunk: RowData[] = [];
    
      updatedData.forEach((data: RowData) => {
        const rowId = `${data.storeId}_${data.skuId}`; // Ensure consistent ID format
    
        if (existingNodes.has(rowId)) {
          updateChunk.push(data); // Update if row exists
        } else {
          addChunk.push(data); // Add if row does not exist
        }
      });
    
      // Apply transactions in chunks to avoid UI lag
      if (updateChunk.length) {
        this.gridApi.applyTransactionAsync({ update: updateChunk });
      }
      if (addChunk.length) {
        this.gridApi.applyTransactionAsync({ add: addChunk });
      }
    }
  }
  