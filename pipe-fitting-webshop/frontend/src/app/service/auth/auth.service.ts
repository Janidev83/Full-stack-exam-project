import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Customer, LoginCustomer } from 'src/app/model/customer.model';
import { environment } from 'src/environments/environment';
import { LOGIN_URL } from 'src/app/constants/url.constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  BASE_URL: string = environment.apiUrl;

  private _loggedInData$: BehaviorSubject<Customer | null> = new BehaviorSubject<Customer | null>(null);
  loggedInData$: Observable<Customer | null> = this._loggedInData$.asObservable();

  constructor(private http: HttpClient) { }

  login(loginData: LoginCustomer): Observable<{accessToken: string; customer: Customer}> {
    return this.http.post<{accessToken: string; customer: Customer}>(`${this.BASE_URL}${LOGIN_URL}`, loginData)
    .pipe(tap(loginResponse => {
      if(loginResponse.accessToken) {
        localStorage.setItem('accessToken', loginResponse.accessToken);
      }
      if(loginResponse.customer) {
        this._loggedInData$.next(loginResponse.customer);
      }
    }));
  };

  logout() {
    this._loggedInData$.next(null);
  };
}
