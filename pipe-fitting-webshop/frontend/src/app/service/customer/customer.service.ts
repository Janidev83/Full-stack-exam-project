import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer, LoginCustomer } from 'src/app/model/customer.model';
import { Observable } from 'rxjs';
import { LOGIN_URL, REGISTRATION_URL, CUSTOMER_URL } from 'src/app/constants/url.constants';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  BASE_URL: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  login(loginData: LoginCustomer): Observable<Customer> {
    return this.http.post<Customer>(`${this.BASE_URL}${LOGIN_URL}`, loginData);
  }

  register(registrationData: Customer): Observable<Customer> {
    return this.http.post<Customer>(`${this.BASE_URL}${REGISTRATION_URL}`, registrationData);
  }

  update(id: string, updatedData: Customer): Observable<Customer> {
    return this.http.put<Customer>(`${this.BASE_URL}${CUSTOMER_URL}/${id}`, updatedData);
  }
}
