import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  // localStorage-ből
  rendelendoIdomfajtak: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  idomfajta: any = {
    name: 'Elbow 90° 63mm',
    manufacturer: 'Georg Fischer',
    weldtech: 'butt-welding',
    price: 2300,
    image: '../../../assets/img/electrfusion_saddle.jpg'
  };

  totalPrice: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  getPrice(amountObj: any): any {
    if(amountObj.operation === 'increase') {
      this.totalPrice += amountObj.price;
    } else {
      this.totalPrice -= amountObj.price;
    }
  }

  confirmOrder(): void {
    const confirmOrder = confirm('Are you sure about sending the order?');
    if(confirmOrder) {
      console.log('rendelést el kell küldenünk most!');
    }
  }

}
