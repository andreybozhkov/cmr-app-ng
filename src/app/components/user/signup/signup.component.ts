import { Component, OnInit } from '@angular/core';

import { User } from '../../../interfaces/user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor() { }

  user = new User("testuser@test.com","testpass","testFirstname","testLastName");
  ngOnInit() {
  }

}
