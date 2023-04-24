import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/model/order.model';
import { OrderService } from 'src/app/service/order/order.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from '../../presentationals/dialog/dialog.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  orders?: Array<Order>;
  orderProblem: string = "You don't have orders yet!";

  constructor(
    private orderService: OrderService,
    private toastr: ToastrService,
    private dialog: MatDialog
    ) { }

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
    this.openDialog().afterClosed().subscribe(booleanString => {
      const confirmDelete = booleanString
      if(confirmDelete === 'true') {
        this.orderService.deleteOrder(orderId!).subscribe({
          next: () => {
            this.toastr.warning('Order canceled');
            this.updateOrders();
          },
          error: err => this.toastr.error(err.message)
        })
      }
    });
  }

  private openDialog(): MatDialogRef<DialogComponent> {
    return this.dialog.open(DialogComponent, {
      panelClass: 'custom-modalbox',
      data: {
        title: 'Delete confirm',
        content: 'Are you sure about deleting order?'
      }
    });
  }

}
