import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from 'src/app/model/order.model';
import { OrderService } from 'src/app/service/order/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  ordersList?: Array<any> = [1,2,3,4,5,6,7,8,9];
  mintaOrder: any = {
    number: 123456789,
    date: new Date(),
    delAddress: '1065 Budapest, Nánási út 132.',
    paidAmount: 123321
  }

  orders?: Array<Order>;
  orderProblem: string = "You don't have orders yet!";

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.updateOrders();
  }

  deleteOrder(orderNumber?: number): void {// beletenni bodyba a user id-t
    const confirmDelete = confirm('Are you sure about canceling the order?');
    if(confirmDelete) {
      this.orderService.deleteOrder(orderNumber!).subscribe({
        next: res => {
          console.log(res);
          this.updateOrders();
        },
        error: err => console.log(err.error.message)
      })
    }
  }

  private updateOrders(): void {
    this.orderService.getOrders().subscribe({
      next: res => this.orders = res,
      error: err => {
        console.log(err.error.message);
        this.orderProblem = err.error.message;
      }
    });
  }

}
