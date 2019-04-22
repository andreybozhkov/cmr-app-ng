import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RemindersTableResolverService {

  constructor() { }

  private currentHaulierTableSub = new Subject<any>();
  currentHaulierTable$ = this.currentHaulierTableSub.asObservable();
  setCurrentHaulierData(haulierData) {
    this.currentHaulierTableSub.next(haulierData);
  }
}
