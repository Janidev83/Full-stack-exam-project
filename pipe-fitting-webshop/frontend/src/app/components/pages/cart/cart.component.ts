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
  itemsInStorage?: Array<Product> | undefined;

  totalPrice: number = 0;
  amount: number = 0;

  constructor(private router: Router, private storageService: StorageService) { }

  ngOnInit(): void {
    if(this.storageService.getLocalStorageItems()) {
      this.itemsInStorage = this.storageService.getLocalStorageItems();
    }
  }

  getPrice(amountObj: any, index: number): any {
    if(amountObj.operation === 'increase') {
      this.totalPrice += amountObj.price;
    } else if(amountObj.operation === 'decrease') {
      this.totalPrice -= amountObj.price;
    } else if (amountObj.operation === 'delete') {
      this.deleteItemFromLocalStorage(index)
    }
  }

  sendOrder(): void {
    const confirmOrder = confirm('Are you sure about sending the order?');
    if(confirmOrder) {
      console.log('rendelést el kell küldenünk most!');
      localStorage.clear();
      this.router.navigate(['']);
    }
  }

  deleteItemFromLocalStorage(index: number): void {
    console.log('Törölni a localStorageből az aktuális itemet!!!');
    const storageItems = this.storageService.getLocalStorageItems();
    if(storageItems) {
      if(storageItems.length > 0) {
        storageItems.splice(index, 1);
        if(storageItems.length >= 1) localStorage.setItem('orderItems', JSON.stringify(storageItems));
      };
      if(storageItems.length === 0) {
        localStorage.clear();
        this.itemsInStorage = undefined;
      };
    }
    this.ngOnInit();
  }

}
