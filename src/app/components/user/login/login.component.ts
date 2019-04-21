import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/dataClasses/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private userService: UserService, private router: Router) { }

  user: User = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    roles: [],
    _id: ''
  }

  onSubmit() {
    this.userService.logIn(this.user).subscribe(res => {
      sessionStorage.setItem("authtoken", res.body._kmd.authtoken);
      this.router.navigate(['/']);
    });
  }
}
