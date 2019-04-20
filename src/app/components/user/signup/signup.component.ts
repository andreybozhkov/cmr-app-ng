import { Component } from '@angular/core';

import { User } from '../../../interfaces/user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  constructor() { }

  user: User = {
    username: '',
    password: '',
    firstName: '',
    lastName: ''
  }

  onSubmit() {
    for (let field in this.user) {
      if (this.user[field].length === 0) {
        console.log(`${field} cannot be empty!`);
        return;
      }
    }
    console.log(this.user);
  }

}
