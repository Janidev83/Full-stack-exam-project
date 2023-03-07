import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  ordersList?: Array<any> = [1,2,3,4,5,6,7,8,9,1,2,3,4,5,65,76,7,8,9,1,2,2,3,4,5,,6,7,8,,8];
  mintaOrder: any = {
    number: 123456789,
    date: new Date(),
    delAddress: '1065 Budapest, Nánási út 132.',
    paidAmount: 123321
  }

  constructor() { }

  ngOnInit(): void {
  }

  deleteOrder(): void {
    const confirmDelete = confirm('Are you sure about canceling the order?');
    if(confirmDelete) {
      console.log('Rendelést törölni!');
      // törlés az adatbázisból
      this.ordersList?.splice(this.ordersList.length - 1, 1);
      // generálódjon újra a táblázat:
      this.ngOnInit();
    }
  }

}