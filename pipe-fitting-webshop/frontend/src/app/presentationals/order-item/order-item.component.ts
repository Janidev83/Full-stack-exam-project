import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss']
})
export class OrderItemComponent implements OnInit {

  @Input() idomAdat: any;
  @Output() productAmount = new EventEmitter<any>();
  amount: number = 0;

  constructor() {}

  ngOnInit(): void {
  }

  decreaseAmount(): void {
    if(this.amount !== 0) {
      this.amount -= 1;
      this.emitProductAmount('decrease');
    }
  }

  increaseAmount(): void {
    this.amount += 1;
    this.emitProductAmount('increase');
  }

  emitProductAmount(operation?: string): void {
    this.productAmount.emit({operation: operation, price: this.idomAdat.price});
  }

}

