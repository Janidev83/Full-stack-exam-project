import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Customer, LoginCustomer } from 'src/app/model/customer.model';
import { environment } from 'src/environments/environment';
import { LOGIN_URL, CUSTOMER_URL, REFRESH_URL, LOGOUT_URL } from 'src/app/constants/url.constants';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  BASE_URL: string = environment.apiUrl;

  private _loggedInData$: BehaviorSubject<Customer | null> = new BehaviorSubject<Customer | null>(null);
  loggedInData$: Observable<Customer | null> = this._loggedInData$.asObservable();

  get loggedUserData(): Customer | null {
    return this._loggedInData$.value ? this._loggedInData$.value : null;
  };

  constructor(private http: HttpClient, private storageService: StorageService) { }

  login(loginData: LoginCustomer): Observable<{accessToken: string; customer: Customer, refreshToken: string}> {
    return this.http.post<{accessToken: string; customer: Customer, refreshToken: string}>(`${this.BASE_URL}${LOGIN_URL}`, loginData)
    .pipe(tap(loginResponse => {
      if(loginResponse.accessToken && loginResponse.refreshToken) {
        localStorage.setItem('accessToken', loginResponse.accessToken);
        localStorage.setItem('refreshToken', loginResponse.refreshToken);
      }
      if(loginResponse.customer) {
        this._loggedInData$.next(loginResponse.customer);
      }
    }));
  };

  refresh(): Observable<{accessToken: string}> {
    const refreshToken = this.storageService.getLocalStorageItems('refreshToken');

    return this.http.post<{accessToken: string}>(`${this.BASE_URL}${REFRESH_URL}`, {refreshToken})
    .pipe(tap(tokenObj => {
      if(tokenObj && tokenObj.accessToken) {
        this.storageService.setToken('accessToken', tokenObj.accessToken)
      }
    }))
  };

  logout(): Observable<{}> {
    const refreshToken = this.storageService.getLocalStorageItems('refreshToken');
    localStorage.clear();
    this._loggedInData$.next(null);
    this.storageService.addSumOfItems();

    return this.http.post<{}>(`${this.BASE_URL}${LOGOUT_URL}`, {refreshToken});
  };

  setAuthentication(): HttpHeaders {
    let headers = new HttpHeaders();
    if(localStorage.getItem('accessToken')) {
      headers = headers.set('Authorization', `Bearer ${localStorage.getItem('accessToken')}`);
    }
    return headers;
  }

  addCustomerData(): Observable<Customer> {
    const headers = this.setAuthentication();
    return this.http.get<Customer>(`${this.BASE_URL}${CUSTOMER_URL}`, {headers: headers})
    .pipe(tap(response => {
      if(response) {
        this._loggedInData$.next(response);
      }
    }));
  }

  setUpdatedCustomer(data: Customer): void {
    this._loggedInData$.next(data);
  }

}
