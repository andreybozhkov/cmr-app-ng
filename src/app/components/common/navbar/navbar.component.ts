import { Component, Input, Output, EventEmitter } from '@angular/core';
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
  @Input() firstName: string;
  @Output() logMeOut = new EventEmitter<any>();

  logOut() {
    this.userService.logOut().subscribe(() => {
      sessionStorage.clear();
      this.logMeOut.emit();
      this.router.navigate(['/']);
    });
  }
}
