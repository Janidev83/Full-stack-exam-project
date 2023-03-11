import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/model/product.model';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {

  @Input() product?: Product;
  @Input() index!: number;
  @Output() emitIndex = new EventEmitter<number>();
  loggedUser: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  passIndex(): void {
    this.emitIndex.emit(this.index);
  }

}
