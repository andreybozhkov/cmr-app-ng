import { Component, OnInit } from '@angular/core';
import { ShipmentService } from 'src/app/services/shipment/shipment.service';
import { Shipment } from 'src/app/dataClasses/shipment';
import { HaulierService } from 'src/app/services/haulier/haulier.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-shipments',
  templateUrl: './shipments.component.html',
  styleUrls: ['./shipments.component.css']
})
export class ShipmentsComponent implements OnInit {
  shipments: Array<Shipment> = [];
  constructor(private shipmentService: ShipmentService, private haulierSerivce: HaulierService, private userService: UserService) { }

  ngOnInit() {
    this.shipmentService.getShipments().subscribe(r => {
      this.shipments = r;

      let haulierIDs = [];
      let userIDs = [];
      for (let shipment of this.shipments) {
        if (!haulierIDs.includes(shipment.haulier)) {
          haulierIDs.push(shipment.haulier); 
        }
        if (!userIDs.includes(shipment._acl.creator)) {
          userIDs.push(shipment._acl.creator)
        };
      }

      let haulierPromises = haulierIDs.map(haulierId => {
        return this.haulierSerivce.getHaulierById(haulierId).toPromise();
      });
      Promise.all(haulierPromises).then(res => {
        this.shipments.forEach(shipment => {
          shipment.haulier = res.find(e => {
            return e._id === shipment.haulier;
            }).name;
        });
      });

      let userIdPromises = userIDs.map(userId => {
        return this.userService.getUserById(userId).toPromise();
      });
      Promise.all(userIdPromises).then(res => {
        this.shipments.forEach(shipment => {
          shipment._acl.creator = res.find(e => {
            return e._id === shipment._acl.creator;
            }).firstName;
        });
      });
    });
  }
}
