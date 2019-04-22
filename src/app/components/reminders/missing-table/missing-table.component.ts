import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { RemindersTableResolverService } from 'src/app/services/reminders/reminders-table-resolver.service';

@Component({
  selector: 'app-missing-table',
  templateUrl: './missing-table.component.html',
  styleUrls: ['./missing-table.component.css']
})
export class MissingTableComponent implements OnInit {
  subscription: Subscription;
  haulierData: {};
  constructor(private remindersService: RemindersTableResolverService) {
    this.subscription = remindersService.currentHaulierTable$.subscribe(haulierData => {
      this.haulierData = haulierData;
    })
  }

  ngOnInit() {
    console.log(this.haulierData);
  }
}
