import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';
import { ToastrService } from 'ngx-toastr';

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

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
    ) { }

  ngOnInit(): void {
  }

  loginUser(form: NgForm): void {
    this.authService.login(form.value).subscribe({
      next: () => this.router.navigate(['']),
      error: err => this.toastr.error(err.message)
    });
  }

}
