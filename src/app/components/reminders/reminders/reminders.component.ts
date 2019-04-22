import { Component, OnInit } from '@angular/core';
import { ShipmentService } from 'src/app/services/shipment/shipment.service';
import { HaulierService } from 'src/app/services/haulier/haulier.service';

@Component({
  selector: 'app-reminders',
  templateUrl: './reminders.component.html',
  styleUrls: ['./reminders.component.css']
})
export class RemindersComponent implements OnInit {
  access_token_graph: string = '';
  hauliersMissingDocs: object[] = [];
  constructor(private shipmentService: ShipmentService, private haulierSerivce: HaulierService) { }

  ngOnInit() {
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
            shipments: [{ ...shipment }]
          };
          hauliersMissingDocs.push(singleHaulier);
          promisesHauliers.push(this.haulierSerivce.getHaulierById(shipment.haulier).toPromise());
        } else if (hauliersMissingDocs.findIndex((element) => {
            return element.id === shipment.haulier;
        }) >= 0) {
            hauliersMissingDocs[hauliersMissingDocs.findIndex((element) => {
              return element.id === shipment.haulier;
            })].shipments.push({ ...shipment });
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

}
