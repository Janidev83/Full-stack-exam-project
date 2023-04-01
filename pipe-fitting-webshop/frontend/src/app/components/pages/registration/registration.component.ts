import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';
import { CustomerService } from 'src/app/service/customer/customer.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  role!: string;

  newUserData = {
    _id: '',
    lastName: '',
    firstName: '',
    address: '',
    email: '',
    password: ''
  }

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private customerService: CustomerService,
    private authService: AuthService
    ) { }

  ngOnInit(): void {
    this.role = this.activatedRoute.snapshot.url[0].path;

    if(this.role === 'update_account') {
      this.authService.loggedInData$.subscribe({
        next: userData => {
          if(userData) {
            this.newUserData = {...this.newUserData, ...userData};
          }
        }
      });
    }
  }

  handleUser(form: NgForm): void {
    if(this.role === 'registration') this.registrateUser(form);
    if(this.role === 'update_account') this.updateUser(form);
  }

  registrateUser(form: NgForm): void {
    this.customerService.register(form.value).subscribe({
      next: res => console.log(res),
      error: err => console.log(err.error.message)
    });
    this.router.navigate(['']);
  }

  updateUser(form: NgForm): void {
    this.customerService.update(this.newUserData._id, form.value).subscribe({
      next: res => console.log(res),
      error: err => console.log(err.error.message)
    });
    this.router.navigate(['']);
  }
}
