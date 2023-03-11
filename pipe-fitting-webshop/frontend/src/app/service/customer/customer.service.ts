import { environment } from './../../../environments/environment';
import { Customer, LoginCustomer } from './../../model/customer.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LOGIN_URL, REGISTRATION_URL, UPDATE_URL } from 'src/app/constants/url.constants';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  BASE_URL: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  login(loginData: LoginCustomer): Observable<LoginCustomer> {
    return this.http.post<LoginCustomer>(`${this.BASE_URL}${LOGIN_URL}`, loginData);
  }

  register(registrationData: Customer): Observable<Customer> {
    return this.http.post<Customer>(`${this.BASE_URL}${REGISTRATION_URL}`, registrationData);
  }

  update(updatedData: Customer): Observable<Customer> {
    return this.http.put<Customer>(`${this.BASE_URL}${UPDATE_URL}`, updatedData);
  }
}
