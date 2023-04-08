import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/app/model/customer.model';
import { Product } from 'src/app/model/product.model';
import { AuthService } from 'src/app/service/auth/auth.service';
import { OrderService } from 'src/app/service/order/order.service';
import { StorageService } from 'src/app/service/storage/storage.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  itemsInStorage?: Array<Product> | null;
  totalPrice!: number;
  customer!: Customer | null;

  constructor(
    private router: Router,
    private storageService: StorageService,
    private orderService: OrderService,
    private authService: AuthService,
    private toastr: ToastrService
    ) { }

  ngOnInit(): void {
    this.customer = this.authService.loggedUserData;

    this.setCartData();
  }

  setCartData(): void {
    this.itemsInStorage = this.storageService.getLocalStorageItems('orderItems') ? this.storageService.getLocalStorageItems('orderItems') : null;
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
    if(confirmOrder && this.customer?._id) {
      this.orderService.saveOrder(this.customer?._id, {deliveryAddress: this.customer.address, paidAmount: this.totalPrice}).subscribe({
        error: err => this.toastr.error(err.message)
      });
      localStorage.removeItem('orderItems');
      this.storageService.addSumOfItems();
      this.router.navigate(['']);
      this.toastr.success('Order sent', 'Success');
    }
  }

  deleteItemFromLocalStorage(index: number): void {
    const storageItems = this.storageService.getLocalStorageItems('orderItems');
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
