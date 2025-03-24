import { Component } from '@angular/core';
import { storesData } from '../data/store-data';
import { store } from '../data/viewer.interface';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  standalone: false,
  styleUrls: ['./store.component.scss']
})
export class StoreComponent {
  stores: store[] = [];
  newStore = {  sno: this.stores.length+1, id: '',label: '', city: '', state: '' };
  ngOnInit(){
    this.inializeStore();
  }

   addStore(): void {
    if (this.newStore.id && this.newStore.label && this.newStore.city && this.newStore.state) {
      this.newStore.sno = this.stores.length+1;
      this.stores.push({ ...this.newStore });
      localStorage.setItem('stores', JSON.stringify(this.stores));
      this.newStore = { sno: this.stores.length+1, id: '',label: '', city: '', state: '' }; // Reset form
    } else {
      alert('Please fill in all fields');
    }
  }

  updateStore(index: number): void {
    const updatedStore = prompt('Update store name:', this.stores[index].label);
    if (updatedStore) {
      this.stores[index].label = updatedStore;
      localStorage.setItem('stores', JSON.stringify(this.stores));
    }
  }

  deleteStore(index: number): void {
    if (confirm('Are you sure you want to delete this store?')) {
      this.stores.splice(index, 1);
      localStorage.setItem('stores', JSON.stringify(this.stores));
    }
  }

  inializeStore() {
    this.stores = JSON.parse(localStorage.getItem('stores') || '[]');
    if (this.stores.length < 1){
      this.stores = storesData;
      localStorage.setItem('stores', JSON.stringify(this.stores));
    }
  }
}
