import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  loggedUser: any = true;

  constructor() { }

  ngOnInit(): void {
  }

  logout(): void {
    console.log('Ki akarok jelentkezni!!!');

  }
}
