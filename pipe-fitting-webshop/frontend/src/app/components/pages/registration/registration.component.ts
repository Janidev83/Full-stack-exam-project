import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  role!: string;

  oldUserData: any = {
    _id: 'database id',
    lastName: 'Ambrus',
    firstName: 'János',
    address: '1031 Budapest, Csónakház utca 9.',
    email: 'ambja1983@gmail.com'
  }

  newUserData = {
    _id: this.oldUserData._id,
    lastName: '',
    firstName: '',
    address: '',
    email: '',
    password: ''
  }

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.role = this.activatedRoute.snapshot.url[0].path;

    if(this.role === 'update_account') {
      this.newUserData = {...this.oldUserData};
    }
  }

  handleUser(form: NgForm): void {
    if(this.role === 'registration') this.registrateUser(form);
    if(this.role === 'update_account') this.updateUser(form);
  }

  registrateUser(form: NgForm): void {
    console.log('registrate:', form.value);
    this.router.navigate(['']);
  }

  updateUser(form: NgForm): void {
    console.log('update:', form.value);
    this.router.navigate(['']);
  }
}
