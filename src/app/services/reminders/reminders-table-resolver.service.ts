import { Injectable } from '@angular/core';
import { Subject, Observable, of } from 'rxjs';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { mergeMap, take } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RemindersTableResolverService implements Resolve<any> {

  constructor(private router: Router, private http: HttpClient) { }

  private currentHaulierTableSub = new Subject<any>();
  currentHaulierTable$ = this.currentHaulierTableSub.asObservable();
  setCurrentHaulierData(haulierData: object) {
    this.currentHaulierTableSub.next(haulierData);
  }

  returnCurrentHaulier() {
    return this.currentHaulierTable$;
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Observable<never> {
    return this.returnCurrentHaulier().pipe(
      take(1),
      mergeMap(haulierData => {
        return of(haulierData);
      })
    );
  }

  sendReminder(mailBody: string) {
    return this.http.post<any>(
      'https://graph.microsoft.com/v1.0/me/sendMail',
      JSON.stringify({
        'message': {
          'subject': 'Missing Documents - Please Check and Send',
          'body': {
            'contentType': 'HTML',
            'content': `Hello,<br/>Please see below list of missing documents and send them to us as soon as possible:<br/>${mailBody}`
          },
          'toRecipients': [
            {
              'emailAddress': {
                'address': 'abo@ntgcontinent.se'
              }
            }
          ]
        }
      }),
      {
        headers: {
          'Authorization': sessionStorage.getItem('access_token_graph'),
          'Content-Type': 'application/json'
        }
      }
    )
  }
}
