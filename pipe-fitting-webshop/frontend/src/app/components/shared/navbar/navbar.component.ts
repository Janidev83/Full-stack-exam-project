import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { StorageService } from 'src/app/service/storage/storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  loggedUser: any = true;
  sumOfStorageItems!: number;
  storageSubscription?: Subscription;

  constructor(private storageService: StorageService) { }

  ngOnInit(): void {
    this.storageSubscription = this.storageService.sumOfCartItems$.subscribe({
      next: res => this.sumOfStorageItems = res
    })
    this.storageService.addSumOfItems();
  }

  logout(): void {
    console.log('Ki akarok jelentkezni!!!');
    localStorage.clear();
    this.storageService.addSumOfItems();
  }

  ngOnDestroy(): void {
    this.storageSubscription?.unsubscribe();
  }
}
