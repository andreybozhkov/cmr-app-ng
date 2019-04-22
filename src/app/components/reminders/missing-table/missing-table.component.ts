import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RemindersTableResolverService } from 'src/app/services/reminders/reminders-table-resolver.service';

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
  access_token_graph: string = '';

  constructor(private route: ActivatedRoute, private remindersService: RemindersTableResolverService) {
    this.route.data.subscribe(data => {
      this.haulierData = {
        id: data.remindersResolver.id,
        name: data.remindersResolver.name,
        shipments: data.remindersResolver.shipments
      };
    });
  }

  ngOnInit() {
    if (this.access_token_graph.length === 0 && sessionStorage.getItem('access_token_graph')) {
      this.access_token_graph = sessionStorage.getItem('access_token_graph');
    } else if (this.access_token_graph.length > 0 && !sessionStorage.getItem('access_token_graph')) {
      this.access_token_graph = '';
    }
  }

  sendReminder() {
    let tableHead = '<thead><tr><th>Trailer</th><th>Loading Address</th><th>Unloading Address</th><th>Delivery Date</th><th>Project ID</th>';
    tableHead+= '<th>Shipment ID</th><th>Status</th><th>Documents Needed</th><th>Notes</th></tr></thead>';
    let tableBody = '<tbody>';
    this.haulierData.shipments.forEach(shipment => {
      let row = '<tr>';
      row+= `<td>${shipment['trailer']}</td><td>${shipment['loading-address']}</td><td>${shipment['unloading-address']}</td><td>${shipment['delivery-date']}</td>`;
      row+= `<td>${shipment['project-id']}</td><td>${shipment['shipment-id']}</td><td>${shipment['status']}</td><td>${shipment['documents-needed']}</td><td>${shipment['notes-internal']}</td>`;
      row += '</tr>';  
      tableBody += row;
    });

    let mailBody = `<table'>${tableHead}${tableBody}</table>`;
    
    this.remindersService.sendReminder(mailBody).subscribe(r => {
    });
  }
}
