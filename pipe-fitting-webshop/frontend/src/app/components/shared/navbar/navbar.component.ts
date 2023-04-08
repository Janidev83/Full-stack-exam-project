import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Customer } from 'src/app/model/customer.model';
import { AuthService } from 'src/app/service/auth/auth.service';
import { StorageService } from 'src/app/service/storage/storage.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  sumOfStorageItems!: number;
  storageSubscription?: Subscription;
  loggedInUser$!: Observable<Customer | null>;

  constructor(private storageService: StorageService,
    private authService: AuthService,
    private toastr: ToastrService
    ) { }

  ngOnInit(): void {
    if(this.storageService.getLocalStorageItems('accessToken')) {
      this.authService.addCustomerData().subscribe({
        error: err => this.toastr.error(err.message)
      });
    }

    this.setNavbar();
  }

  logout(): void {
    this.authService.logout().subscribe({
      error: err => this.toastr.error(err.message),
      complete: () => this.setNavbar()
    });
  }

  private setNavbar() {
    this.storageSubscription = this.storageService.sumOfCartItems$.subscribe({
      next: res => this.sumOfStorageItems = res
    })
    this.storageService.addSumOfItems();
    this.loggedInUser$ = this.authService.loggedInData$;
  }

  ngOnDestroy(): void {
    this.storageSubscription?.unsubscribe();
  }

}
