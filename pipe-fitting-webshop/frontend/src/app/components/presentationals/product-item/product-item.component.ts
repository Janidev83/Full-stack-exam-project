import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/model/product.model';
import { StorageService } from 'src/app/service/storage/storage.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {

  @Input() product!: Product;
  @Input() index!: number;
  @Output() emitIndex = new EventEmitter<number>();
  storageContains!: boolean;
  loggedUser: boolean = true;

  constructor(private storageService: StorageService) { }

  ngOnInit(): void {
    this.setCard();
  }

  setCard(): void {
    const storageItems = this.storageService.getLocalStorageItems();
    if(storageItems) {
      this.storageContains = this.storageService.examStorage(storageItems, this.product);
    }
  }

  passIndex(): void {
    this.emitIndex.emit(this.index);
    this.setCard();
  }

}
