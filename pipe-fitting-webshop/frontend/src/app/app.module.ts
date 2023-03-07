import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { ProductsComponent } from './pages/products/products.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { CartComponent } from './pages/cart/cart.component';
import { FormsModule } from '@angular/forms';
import { ProductItemComponent } from './presentationals/product-item/product-item.component';
import { PaginationComponent } from './presentationals/pagination/pagination.component';
import { OrderItemComponent } from './presentationals/order-item/order-item.component';

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
