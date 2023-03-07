import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
    OrderItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
