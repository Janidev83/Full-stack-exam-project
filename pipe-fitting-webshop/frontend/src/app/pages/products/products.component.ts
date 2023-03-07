import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  idomok: Array<number> = [1, 2, 3, 4, 5, 6];
  idom: any = {
    name: 'Coupler 20mm',
    manufacturer: 'AGRU',
    weldtech: 'electrofusion',
    price: 1000,
    image: '../../../assets/img/electrofusion_coupler.jpg'
  };

  constructor() { }

  ngOnInit(): void {
  }

}
