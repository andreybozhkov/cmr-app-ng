import { Component, Input } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private userService: UserService, private router: Router) { }
  @Input() authToken: boolean;

  logOut() {
    this.userService.logOut().subscribe(() => {
      sessionStorage.clear();
      this.router.navigate(['/']);
    });
  }
}
