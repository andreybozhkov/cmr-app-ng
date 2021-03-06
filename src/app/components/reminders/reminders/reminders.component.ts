import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShipmentService } from 'src/app/services/shipment/shipment.service';
import { HaulierService } from 'src/app/services/haulier/haulier.service';
import { Router } from '@angular/router';
import { RemindersTableResolverService } from 'src/app/services/reminders/reminders-table-resolver.service';

@Component({
  selector: 'app-reminders',
  templateUrl: './reminders.component.html',
  styleUrls: ['./reminders.component.css']
})
export class RemindersComponent implements OnInit {
  access_token_graph: string = '';
  hauliersMissingDocs = [];
  constructor(private shipmentService: ShipmentService,
              private haulierSerivce: HaulierService,
              private router: Router,
              private route: ActivatedRoute,
              private remindersService: RemindersTableResolverService) { }

  ngOnInit() {
    let parsedUrl = new URL(window.location.href);
    let access_token = parsedUrl.hash.slice(parsedUrl.hash.indexOf("=") + 1, parsedUrl.hash.indexOf("&"));
    if (access_token != null && access_token.length > 0) {
      sessionStorage.setItem('access_token_graph', access_token);
      this.access_token_graph = access_token;
    }
    if (sessionStorage.getItem('access_token_graph') && this.access_token_graph.length === 0) {
      this.access_token_graph = sessionStorage.getItem('access_token_graph');
    }

    this.shipmentService.getShipmentsByQuery('status', 'Need Documents').subscribe(res => {
      let shipmentsMissingDocs = res;
      let hauliersMissingDocs = [];
      let promisesHauliers = [];

      for (let shipment of shipmentsMissingDocs) {
        if (hauliersMissingDocs.findIndex((element) => {
          return element.id === shipment.haulier;
        }) === -1) {
          let singleHaulier = {
            id: shipment.haulier,
            name: '',
            shipments: [{
              trailer: shipment.trailer,
              'loading-address': shipment['loading-address'],
              'unloading-address': shipment['unloading-address'],
              'delivery-date': shipment['delivery-date'],
              'project-id': shipment['project-id'],
              'shipment-id': shipment._id,
              status: shipment.status,
              'documents-needed': shipment['documents-needed'],
              'notes-internal': shipment['notes-internal']
            }]
          };
          hauliersMissingDocs.push(singleHaulier);
          promisesHauliers.push(this.haulierSerivce.getHaulierById(shipment.haulier).toPromise());
        } else if (hauliersMissingDocs.findIndex((element) => {
            return element.id === shipment.haulier;
        }) >= 0) {
            hauliersMissingDocs[hauliersMissingDocs.findIndex((element) => {
              return element.id === shipment.haulier;
            })].shipments.push({
              trailer: shipment.trailer,
              'loading-address': shipment['loading-address'],
              'unloading-address': shipment['unloading-address'],
              'delivery-date': shipment['delivery-date'],
              'project-id': shipment['project-id'],
              'shipment-id': shipment._id,
              status: shipment.status,
              'documents-needed': shipment['documents-needed'],
              'notes-internal': shipment['notes-internal']
            });
        }
      }

      Promise.all(promisesHauliers).then(res => {
        for (let haulier of hauliersMissingDocs) {
          haulier.name = res.find((e) => {
            return e._id === haulier.id
          }).name;
        }
        this.hauliersMissingDocs = hauliersMissingDocs;
      })
    });
  }

  displayTable(haulierId: string) {
    let haulierData = this.hauliersMissingDocs.find((e) => {
      return e.id === haulierId;
    });
    this.remindersService.setCurrentHaulierData(haulierData);
    this.router.navigate([`./${haulierId}`], {relativeTo: this.route});
  }

  handleImplicitToken() {
    window.open('https://login.microsoftonline.com/b01aab02-d012-43b9-98de-902903e53920/oauth2/v2.0/authorize?client_id=55647bde-885a-40bc-8744-e9d7630d9302&scope=openid%20profile%20email%20User.Read%20Mail.ReadWrite%20Mail.Send&redirect_uri=http%3A%2F%2Flocalhost%3A4200%2Freminders&response_type=token', '_self');
  }
}
