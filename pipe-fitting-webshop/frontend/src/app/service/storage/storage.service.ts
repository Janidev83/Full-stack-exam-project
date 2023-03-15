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

  setQuantityInStorage(product: Product, amount: number): void {
    const list = this.getLocalStorageItems();
    const productIndex = list.findIndex((item: Product) => product.name === item.name);
    list[productIndex].quantity = amount;
    localStorage.setItem('orderItems', JSON.stringify(list));
  }

  addSumOfItems(): void {
    const sumOFItems = this.getLocalStorageItems() ? this.getLocalStorageItems().length : 0;
    this.sumOfCartItems$.next(sumOFItems);
  }

  examStorage(itemList: Array<Product>, item: Product): boolean {
    return itemList.find(product => product.name === item.name) ? true : false;
  }

  getTotalPrice(): number {
    if(this.getLocalStorageItems()) {
      return this.getLocalStorageItems()
        .map((item: Product) => item.quantity ? item.price * item.quantity : 0)
        .reduce((acc: number, curr: number) => acc + curr, 0);
    }
    return 0;
  }

}
