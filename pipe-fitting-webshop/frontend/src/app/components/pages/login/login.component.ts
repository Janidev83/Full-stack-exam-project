import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/service/customer/customer.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginCustomer = {
    email: '',
    password: ''
  }

  constructor(private router: Router, private customerService: CustomerService) { }

  ngOnInit(): void {
  }

  loginUser(form: NgForm): void {
    console.log(form.value);
    this.customerService.login(form.value).subscribe();
    this.router.navigate(['']);
  }

}
