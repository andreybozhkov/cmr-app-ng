import { Component, DoCheck } from '@angular/core';
import { User } from './dataClasses/user';
import { UserService } from './services/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck {
  constructor(private userService: UserService) {}

  title = 'CMR App Angular';
  authToken : boolean = false;
  loggedUser : User = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    roles: []
  };

  ngDoCheck() {
    if(!this.authToken && sessionStorage.getItem('authtoken')) {
      this.authToken = true;
      this.userService.getLoggedUser().subscribe(res => {
        this.loggedUser = {
          username: res.body.username,
          password: '',
          firstName: res.body.firstName,
          lastName: res.body.lastName,
          roles: res.body.roles
        }
      });
    }
    if(this.authToken && !sessionStorage.getItem('authtoken')) {
      this.authToken = false;
    }
  }
}
