import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Product } from 'src/app/model/product.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  sumOfCartItems$: Subject<number> = new Subject<number>();

  constructor() { }

  getLocalStorageItems(): any {
    const storageItems = localStorage.getItem('orderItems');
    if(storageItems) {
      return JSON.parse(storageItems);
    };
  }

  addSumOfItems(): void {
    const sumOFItems = this.getLocalStorageItems() ? this.getLocalStorageItems().length : 0;

    this.sumOfCartItems$.next(sumOFItems);
  }

  examStorage(itemList: Array<Product>, item: Product): boolean {
    return itemList.find(product => product.name === item.name) ? true : false;
  }
}
