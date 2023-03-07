import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  loggedUser: any = true;

  oldUserData: any = {
    id: 'database id',
    lastName: 'Ambrus',
    firstName: 'János',
    address: '1031 Budapest, Csónakház utca 9.',
    email: 'ambja1983@gmail.com'
  }

  newUserData = {
    lastName: '',
    firstName: '',
    address: '',
    email: '',
    password: ''
  }

  constructor() { }

  ngOnInit(): void {
    if(this.loggedUser) {
      this.newUserData = this.oldUserData;
    }
  }

  registrateUser(form: NgForm): void {
    console.log('registrate:', form.value);
  }

  updateUser(form: NgForm): void {
    console.log('update:', form.value);
  }
}
