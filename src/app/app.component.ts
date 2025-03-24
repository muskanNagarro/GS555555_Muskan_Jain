import { Component, OnInit } from '@angular/core';
import { storesData } from './data/store-data';
import { skusData } from './data/sku-data';
import { planningData } from './data/planning-data';
import { RowData, skus, store } from './data/viewer.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Data Viewer App';
  
  ngOnInit(): void {
    localStorage.setItem('stores', JSON.stringify(storesData));
    localStorage.setItem('skus', JSON.stringify(skusData));
    localStorage.setItem('planning', JSON.stringify(planningData));
  }
}
