import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { HomeComponent } from './components/pages/home/home.component';
import { LoginComponent } from './components/pages/login/login.component';
import { RegistrationComponent } from './components/pages/registration/registration.component';
import { ProductsComponent } from './components/pages/products/products.component';
import { OrdersComponent } from './components/pages/orders/orders.component';
import { CartComponent } from './components/pages/cart/cart.component';
import { FormsModule } from '@angular/forms';
import { ProductItemComponent } from './components/presentationals/product-item/product-item.component';
import { PaginationComponent } from './components/presentationals/pagination/pagination.component';
import { OrderItemComponent } from './components/presentationals/order-item/order-item.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ToastrModule } from "ngx-toastr";
import { AuthInterceptor } from 'src/interceptors/authentication.interceptor';
import { CurrencyPipe } from '@angular/common';
import { HufCurrencyPipe } from './pipes/hufcurrency.pipe';
import { registerLocaleData } from '@angular/common';
import localeHu from '@angular/common/locales/hu';

registerLocaleData(localeHu, 'hu-HU');

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    RegistrationComponent,
    ProductsComponent,
    OrdersComponent,
    CartComponent,
    ProductItemComponent,
    PaginationComponent,
    OrderItemComponent,
    HufCurrencyPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    CurrencyPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
