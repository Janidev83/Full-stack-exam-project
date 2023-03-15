import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss']
})
export class OrderItemComponent implements OnInit {

  @Input() itemData: any;
  @Output() productAmount = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {
  }

  decreaseAmount(): void {
    if(this.itemData.quantity > 1) {
      this.itemData.quantity -= 1;
      this.emitProductAmount('', this.itemData.quantity);
    } else {
      this.emitProductAmount('delete');
    }
  }

  increaseAmount(): void {
    this.itemData.quantity += 1;
    this.emitProductAmount('', this.itemData.quantity);
  }

  emitProductAmount(operation?: string, amount?: number): void {
    this.productAmount.emit({operation: operation, amount: amount});
  }

}

