import { Component, OnInit } from '@angular/core';
import { RemindersTableResolverService } from 'src/app/services/reminders/reminders-table-resolver.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-missing-table',
  templateUrl: './missing-table.component.html',
  styleUrls: ['./missing-table.component.css']
})
export class MissingTableComponent implements OnInit {
  haulierData: {
    id: '',
    name: '',
    shipments: []
  };
  constructor(private route: ActivatedRoute) {
    this.route.data.subscribe(data => {
      this.haulierData = {
        id: data.remindersResolver.id,
        name: data.remindersResolver.name,
        shipments: data.remindersResolver.shipments
      };
    });
    console.log(this.haulierData);
  }

  ngOnInit() {
    
  }
}
