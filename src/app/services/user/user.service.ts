import { Injectable } from '@angular/core';
import config from '../../config/config';
import { User } from 'src/app/dataClasses/user';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  signUp(userData: User): Observable<HttpResponse<any>> {
    let encodedAuth = window.btoa(`${config.kinveyAppKey}:${config.kinveyAppSecret}`);
    let data = JSON.stringify(userData);
    return this.http.post<any>(
      `https://baas.kinvey.com/user/${config.kinveyAppKey}/`,
      data,
      {
        headers: {
          'Authorization': `Basic ${encodedAuth}`,
          'Content-Type': 'application/json'
        },
        observe: 'response'
      }
    )
  }

  logIn(userData: User): Observable<HttpResponse<any>> {
    let encodedAuth = window.btoa(`${config.kinveyAppKey}:${config.kinveyAppSecret}`);
    let data = JSON.stringify(userData);
    return this.http.post<any>(
      `https://baas.kinvey.com/user/${config.kinveyAppKey}/login`,
      data,
      {
        headers: {
          'Authorization': `Basic ${encodedAuth}`,
          'Content-Type': 'application/json'
        },
        observe: 'response'
      }
    )
  }

  logOut(): Observable<HttpResponse<any>> {
    return this.http.post<any>(
      `https://baas.kinvey.com/user/${config.kinveyAppKey}/_logout`,
      {},
      {
        headers: {
          'Authorization': `Kinvey ${sessionStorage.getItem('authtoken')}`
        }
      }
    )
  }

  getLoggedUser(): Observable<HttpResponse<User>> {
    return this.http.get<User>(
      `https://baas.kinvey.com/user/${config.kinveyAppKey}/_me`,
      {
        headers: {
        'Authorization': `Kinvey ${sessionStorage.getItem('authtoken')}`
        },
        observe: 'response'
      }
    );
  }

  getUserById(userId: string): Observable<User> {
    return this.http.get<User>(
      `https://baas.kinvey.com/user/${config.kinveyAppKey}/${userId}`,
      {
        headers: {
          'Authorization': `Kinvey ${sessionStorage.getItem('authtoken')}`
        }
      }
    )
  }

  private loggedUserSub = new Subject<User>();
  loggedUser$ = this.loggedUserSub.asObservable();
  checkLoggedUser(user: User) {
    if (user._id.length > 0) {
      this.loggedUserSub.next(user);
    }
  }
}
