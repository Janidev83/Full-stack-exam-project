import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from 'src/app/model/product.model';
import { Observable } from 'rxjs';
import { PRODUCT_URL } from 'src/app/constants/url.constants';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  BASE_URL: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getProducts(volume: number): Observable<Array<Product>> {
    let queryParams = new HttpParams().append('volume', volume);

    return this.http.get<Array<Product>>(`${this.BASE_URL}${PRODUCT_URL}`, {params: queryParams});
  }

}
