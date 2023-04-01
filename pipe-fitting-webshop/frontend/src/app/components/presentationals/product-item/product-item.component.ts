import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/model/customer.model';
import { Product } from 'src/app/model/product.model';
import { AuthService } from 'src/app/service/auth/auth.service';
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
  loggedInUser$!: Observable<Customer | null>;

  constructor(private storageService: StorageService, private authService: AuthService) { }

  ngOnInit(): void {
    this.setCard();
  }

  private setCard(): void {
    const storageItems = this.storageService.getLocalStorageItems('orderItems');
    if(storageItems) {
      this.storageContains = this.storageService.examStorage(storageItems, this.product);
    }
    this.loggedInUser$ = this.authService.loggedInData$;
  }

  passIndex(): void {
    this.emitIndex.emit(this.index);
    this.setCard();
  }

}
