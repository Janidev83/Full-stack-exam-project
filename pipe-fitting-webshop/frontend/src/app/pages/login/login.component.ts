import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loggingUser = {
    email: '',
    password: ''
  }

  constructor() { }

  ngOnInit(): void {
  }

  loginUser(form: NgForm): void {
    console.log(form.value);
  }

}
