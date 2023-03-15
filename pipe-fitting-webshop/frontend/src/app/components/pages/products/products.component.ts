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

  constructor(private productService: ProductService, private storageService: StorageService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: res => this.products = res
    });
  }

  addToStorage(index: number): void {
    this.storageService.setLocalStorage(index, this.products);
    this.storageService.addSumOfItems();
  }

}


