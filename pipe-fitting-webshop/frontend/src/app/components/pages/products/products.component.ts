import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/model/product.model';
import { ProductService } from 'src/app/service/product/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products!: Array<Product>;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: res => this.products = res
    });
  }

  setLocalStorage(index: number): void {
    const orderItems = localStorage.getItem('orderItems');
    const chosenItem = this.products[index];


    if(orderItems) {
      const parsedItems = JSON.parse(orderItems);
      if(parsedItems.find((item: Product) => item.name === chosenItem.name)) return;
      parsedItems.push({...chosenItem});
      localStorage.setItem('orderItems', JSON.stringify(parsedItems));
    } else {
      localStorage.setItem('orderItems', JSON.stringify([chosenItem]));
    }
  }

}
