import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product.model';
import { StorageService } from 'src/app/service/storage/storage.service';
import { ProductService } from 'src/app/service/product/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products!: Array<Product>;

  constructor(private productService: ProductService, private StorageService: StorageService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: res => this.products = res
    });
  }

  setLocalStorage(index: number): void {
    const orderItems = this.StorageService.getLocalStorageItems();
    const chosenItem = this.products[index];

    if(!orderItems) {
      localStorage.setItem('orderItems', JSON.stringify([chosenItem]));
    }
    if(orderItems) {
      if(this.StorageService.examStorage(orderItems, chosenItem)) return;
      orderItems.push({...chosenItem});
      localStorage.setItem('orderItems', JSON.stringify(orderItems));
    }
    this.StorageService.addSumOfItems();
  }

}


