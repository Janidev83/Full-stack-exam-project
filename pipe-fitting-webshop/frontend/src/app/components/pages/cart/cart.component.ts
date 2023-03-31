import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/model/product.model';
import { OrderService } from 'src/app/service/order/order.service';
import { StorageService } from 'src/app/service/storage/storage.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  // localStorage-ből
  itemsInStorage?: Array<Product> | null;

  totalPrice!: number;

  constructor(private router: Router, private storageService: StorageService, private orderService: OrderService) { }

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
      //! Regisztrált, beégetett id ---> Nem kell ide id és cím, átvariálni a kérést, mert majd a payLoadból fűzzük hozzá a backenden
      //* Átvariálni, hogy a bejelentkezett user id-jét és címét beállítani
      this.orderService.saveOrder('6420791e903a505df216fec9', {deliveryAddress: '1065 Budapest, Nánási út 132.', paidAmount: this.totalPrice}).subscribe({
        next: res => console.log(res),
        error: err => console.log(err.error.message)
      });
      localStorage.removeItem('orderItems');
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
        localStorage.removeItem('orderItems');
      };
    }
    this.storageService.addSumOfItems();
  }

}
