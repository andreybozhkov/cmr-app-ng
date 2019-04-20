import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../../interfaces/user';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  constructor(private userService: UserService, private router: Router) { }

  user: User = {
    username: '',
    password: '',
    firstName: '',
    lastName: ''
  }

  onSubmit(): void {
    this.userService.signUp(this.user).subscribe(res => {
      sessionStorage.setItem("authtoken", res.body._kmd.authtoken);
      this.router.navigate(['/']);
    });
  }

}
