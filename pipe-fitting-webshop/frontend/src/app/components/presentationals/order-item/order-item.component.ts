import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss']
})
export class OrderItemComponent implements OnInit {

  @Input() idomAdat: any;
  @Output() productAmount = new EventEmitter<any>();
  childAmount: number = 0;

  constructor() {}

  ngOnInit(): void {
    this.emitProductAmount();
  }

  decreaseAmount(): void {
    if(this.childAmount !== 0) {
      this.childAmount -= 1;
      this.emitProductAmount('decrease');
    } else {
      this.emitProductAmount('delete');
    }
  }

  increaseAmount(): void {
    this.childAmount += 1;
    this.emitProductAmount('increase');
  }

  emitProductAmount(operation?: string): void {
    this.productAmount.emit({operation: operation, price: this.idomAdat.price, amount: this.childAmount});
  }

}

