import { Injectable } from '@angular/core';
import config from '../../config/config';
import { User } from 'src/app/interfaces/user';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

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

  logIn(userData: object): Observable<HttpResponse<any>> {
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
}
