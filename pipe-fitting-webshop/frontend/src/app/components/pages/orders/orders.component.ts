import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/model/order.model';
import { OrderService } from 'src/app/service/order/order.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  orders?: Array<Order>;
  orderProblem: string = "You don't have orders yet!";

  constructor(private orderService: OrderService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.updateOrders();
  }

  private updateOrders(): void {
    this.orderService.getOrders().subscribe({
      next: res => {
        this.orders = res;
      },
      error: err => {
        this.orderProblem = err.message;
      }
    });
  }

  deleteOrder(orderId?: string): void {
    const confirmDelete = confirm('Are you sure about canceling the order?');
    if(confirmDelete) {
      this.orderService.deleteOrder(orderId!).subscribe({
        next: () => {
          this.toastr.warning('Order canceled');
          this.updateOrders();
        },
        error: err => this.toastr.error(err.message)
      })
    }
  }

}
