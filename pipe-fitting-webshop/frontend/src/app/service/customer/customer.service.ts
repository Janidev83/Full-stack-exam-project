import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer, LoginCustomer } from 'src/app/model/customer.model';
import { Observable } from 'rxjs';
import { LOGIN_URL, REGISTRATION_URL, CUSTOMER_URL } from 'src/app/constants/url.constants';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  BASE_URL: string = environment.apiUrl;

  constructor(private http: HttpClient, private authService: AuthService) { }

  register(registrationData: Customer): Observable<Customer> {
    return this.http.post<Customer>(`${this.BASE_URL}${REGISTRATION_URL}`, registrationData);
  }

  update(id: string, updatedData: Customer): Observable<Customer> {
    return this.http.put<Customer>(`${this.BASE_URL}${CUSTOMER_URL}/${id}`, updatedData);
  }

  getCustomer(): Observable<Customer> {
    const headers = this.authService.setAuthentication();
    return this.http.get<Customer>(`${this.BASE_URL}${CUSTOMER_URL}`, {headers: headers});
  }
}
