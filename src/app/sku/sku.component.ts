import { Component } from '@angular/core';
import { skusData } from '../data/sku-data';
import { skus } from '../data/viewer.interface';

@Component({
  selector: 'app-sku',
  templateUrl: './sku.component.html',
  standalone: false,
  styleUrls: ['./sku.component.scss']
})
export class SkuComponent {
  skus: skus[] = [];
  newSKU = { id: '', label: '', dept: '', class: '', price: 0, cost: 0 }; 
  ngOnInit(){
    this.inializeSkus();
  }

  addSKU(): void {
    if (this.newSKU.id && this.newSKU.label && this.newSKU.class) {
      this.skus.push({ ...this.newSKU });
      localStorage.setItem('skus', JSON.stringify(this.skus));
      this.newSKU = { id: '', label: '', dept: '', class: '', price: 0, cost: 0 };
    } else {
      alert('Please fill in all fields with valid data');
    }
  }

  updateSKU(index: number): void {
    const updatedPrice = prompt('Update Price:', this.skus[index].price.toString());
    const updatedCost = prompt('Update Cost:', this.skus[index].cost.toString());

    if (updatedPrice && updatedCost) {
      this.skus[index] = {
        id: this.skus[index].id,
        dept: this.skus[index].dept,
        label: this.skus[index].label,
        class: this.skus[index].class,
        price: parseFloat(updatedPrice),
        cost: parseFloat(updatedCost),
      };
      localStorage.setItem('skus', JSON.stringify(this.skus));
    }
  }

  deleteSKU(index: number): void {
    if (confirm('Are you sure you want to delete this SKU?')) {
      this.skus.splice(index, 1);
      localStorage.setItem('skus', JSON.stringify(this.skus));
    }
  }

  inializeSkus() {
    this.skus = JSON.parse(localStorage.getItem('skus') || '[]');
    if (this.skus.length < 1){
      this.skus = skusData;
      localStorage.setItem('skus', JSON.stringify(this.skus));
    }
  }
}
