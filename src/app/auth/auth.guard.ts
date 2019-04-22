import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { UserService } from '../services/user/user.service';
import { User } from '../dataClasses/user';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  subscription: Subscription;
  user: User;
  loggedInUser: boolean = false;

  constructor(private userService: UserService, private router: Router) {
    this.subscription = userService.loggedUser$.subscribe(user => {
      this.user = user;
    })
  }

  checkLogin(): boolean {
    if (this.user) {
      return true;
    }

    let parsedUrl = new URL(window.location.href);
    let access_token = parsedUrl.hash.slice(parsedUrl.hash.indexOf("=") + 1, parsedUrl.hash.indexOf("&"));
    if (access_token != null && access_token.length > 0) {
      return true;
    }
    
    this.router.navigate(['/login']);
    return false;
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    return this.checkLogin();
  }
  
}
