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
  amount: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  getPrice(amountObj: any, index: number): any {
    //Ezt átalakítani, hogy mindegyik legenerált gyereknek az amountját sugározza (Ezt a sort)
    this.amount = amountObj.amount;

    if(amountObj.operation === 'increase') {
      this.totalPrice += amountObj.price;
    } else if(amountObj.operation === 'decrease') {
      this.totalPrice -= amountObj.price;
    } else if (amountObj.operation === 'delete') {
      this.deleteItemFromLocalStorage(index)
    }
  }

  confirmOrder(): void {
    const confirmOrder = confirm('Are you sure about sending the order?');
    if(confirmOrder) {
      console.log('rendelést el kell küldenünk most!');
    }
  }

  deleteItemFromLocalStorage(index: number): void {
    console.log('Törölni a localStorageből az aktuális itemet!!!');
    this.rendelendoIdomfajtak.splice(index, 1);
    // generálódjon újra a táblázat??
  }

}
