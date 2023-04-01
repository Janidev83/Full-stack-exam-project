import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Product } from 'src/app/model/product.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  sumOfCartItems$: Subject<number> = new Subject<number>();

  constructor() { }

  getLocalStorageItems(key: string): any {
    const storageItems = localStorage.getItem(key);
    if(storageItems && key === 'accessToken') {
      return storageItems;
    }
    if(storageItems && key === 'orderItems') {
      return JSON.parse(storageItems);
    };
  }

  setLocalStorage(index: number, items: Array<Product>): void {
    const orderItems = this.getLocalStorageItems('orderItems');
    const chosenItem = {...items[index], quantity: 1};

    if(!orderItems) {
      localStorage.setItem('orderItems', JSON.stringify([chosenItem]));
    }
    if(orderItems) {
      if(this.examStorage(orderItems, chosenItem)) return;
      orderItems.push({...chosenItem});
      localStorage.setItem('orderItems', JSON.stringify(orderItems));
    }
  }

  setQuantityInStorage(product: Product, amount: number): void {
    const list = this.getLocalStorageItems('orderItems');
    const productIndex = list.findIndex((item: Product) => product.name === item.name);
    list[productIndex].quantity = amount;
    localStorage.setItem('orderItems', JSON.stringify(list));
  }

  addSumOfItems(): void {
    const sumOFItems = this.getLocalStorageItems('orderItems') ? this.getLocalStorageItems('orderItems').length : 0;
    this.sumOfCartItems$.next(sumOFItems);
  }

  examStorage(itemList: Array<Product>, item: Product): boolean {
    return itemList.find(product => product.name === item.name) ? true : false;
  }

  getTotalPrice(): number {
    if(this.getLocalStorageItems('orderItems')) {
      return this.getLocalStorageItems('orderItems')
        .map((item: Product) => item.quantity ? item.price * item.quantity : 0)
        .reduce((acc: number, curr: number) => acc + curr, 0);
    }
    return 0;
  }

}
