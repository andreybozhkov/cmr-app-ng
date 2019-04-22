import { Injectable } from '@angular/core';
import { Subject, Observable, of } from 'rxjs';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { mergeMap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RemindersTableResolverService implements Resolve<any> {

  constructor(private router: Router) { }

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
}
