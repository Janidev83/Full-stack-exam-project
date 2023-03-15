import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/model/product.model';
import { StorageService } from 'src/app/service/storage/storage.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  // localStorage-ből
  itemsInStorage?: Array<Product> | null;

  totalPrice?: number;

  constructor(private router: Router, private storageService: StorageService) { }

  ngOnInit(): void {
    this.setCartData();
  }

  setCartData(): void {
    this.itemsInStorage = this.storageService.getLocalStorageItems() ? this.storageService.getLocalStorageItems() : null;
    this.totalPrice = this.storageService.getTotalPrice();
  }

  getPrice(amountObj: any, index: number): any {
    if(this.itemsInStorage && !amountObj.operation) {
      this.storageService.setQuantityInStorage(this.itemsInStorage[index], amountObj.amount);
    }
    if (amountObj.operation === 'delete') {
      this.deleteItemFromLocalStorage(index);
    }
    this.setCartData();
  }

  sendOrder(): void {
    const confirmOrder = confirm('Are you sure about sending the order?');
    if(confirmOrder) {
      console.log('rendelést el kell küldenünk most!');
      localStorage.clear();
      this.storageService.addSumOfItems();
      this.router.navigate(['']);
    }
  }

  deleteItemFromLocalStorage(index: number): void {
    const storageItems = this.storageService.getLocalStorageItems();
    if(storageItems) {
      if(storageItems.length > 0) {
        storageItems.splice(index, 1);
        if(storageItems.length >= 1) localStorage.setItem('orderItems', JSON.stringify(storageItems));
      };
      if(storageItems.length === 0) {
        localStorage.clear();
      };
    }
    this.storageService.addSumOfItems();
    this.setCartData();

  }

}
