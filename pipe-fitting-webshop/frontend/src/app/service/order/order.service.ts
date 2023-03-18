import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ORDER_URL } from 'src/app/constants/url.constants';
import { Observable } from 'rxjs';
import { Order } from 'src/app/model/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  BASE_URL: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  saveOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(`${this.BASE_URL}${ORDER_URL}`, order);
  }

  getOrders(): Observable<Array<Order>> {
    return this.http.get<Array<Order>>(`${this.BASE_URL}${ORDER_URL}`);
  }

  deleteOrder(number: number): Observable<any> {
    return this.http.delete<any>(`${this.BASE_URL}${ORDER_URL}/${number}`);
  }
}
