import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ORDER_URL } from 'src/app/constants/url.constants';
import { Observable } from 'rxjs';
import { Order } from 'src/app/model/order.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  BASE_URL: string = environment.apiUrl;
  headers?: HttpHeaders;

  constructor(private http: HttpClient, private authService: AuthService) {}

  saveOrder(id: string, order: Order): Observable<Order> {
    this.headers = this.authService.setAuthentication();
    return this.http.post<Order>(`${this.BASE_URL}${ORDER_URL}/${id}`, order, {headers: this.headers});
  }

  getOrders(): Observable<Array<Order>> {
    this.headers = this.authService.setAuthentication();
    return this.http.get<Array<Order>>(`${this.BASE_URL}${ORDER_URL}`, {headers: this.headers});
  }

  deleteOrder(id: string): Observable<any> {
    this.headers = this.authService.setAuthentication();
    return this.http.delete<any>(`${this.BASE_URL}${ORDER_URL}/${id}`, {headers: this.headers});
  }
}
