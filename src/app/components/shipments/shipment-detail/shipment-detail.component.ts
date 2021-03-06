import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../../../dataClasses/user';
import { UserService } from 'src/app/services/user/user.service';
import { Shipment } from 'src/app/dataClasses/shipment';
import { Haulier } from 'src/app/dataClasses/haulier';
import { HaulierService } from 'src/app/services/haulier/haulier.service';
import { ShipmentService } from 'src/app/services/shipment/shipment.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-shipment-detail',
  templateUrl: './shipment-detail.component.html',
  styleUrls: ['./shipment-detail.component.css']
})
export class ShipmentDetailComponent implements OnInit {
  subscription: Subscription;
  user: User;
  constructor(private userService: UserService,
              private haulierService: HaulierService,
              private shipmentService: ShipmentService,
              private router: Router,
              private route: ActivatedRoute) {
    this.subscription = userService.loggedUser$.subscribe(user => {
      this.user = user;
    });
  }
  shipmentId: string = this.route.snapshot.paramMap.get('id');

  shipment: Shipment = {
    customer: '',
    haulier: '',
    trailer: '',
    loading_address: '',
    unloading_address: '',
    delivery_date: '',
    project_id: '',
    shipment_id: '',
    _id: '',
    invoice_nr: 0,
    invoice_amount: 0,
    invoice_currency: '',
    project_resp: '',
    requested_date: '',
    status: '',
    documents_needed: [],
    received_date: '',
    notes_internal: '',
    reminder_date: '',
    invoice_nr_missing_cmr: '',
    _acl: {"creator": ''},
    _kmd: {"ect": ''}
  }
  hauliers: Haulier[];

  ngOnInit() {
    this.haulierService.getAllHauliers().subscribe(hauliers => {
      this.hauliers = hauliers;
    });

    this.shipmentService.getShipmentById(this.shipmentId).subscribe(shipment => {
      this.shipment = {
        customer: shipment.customer,
        haulier: shipment.haulier,
        trailer: shipment.trailer,
        loading_address: shipment['loading-address'],
        unloading_address: shipment['unloading-address'],
        delivery_date: shipment['delivery-date'],
        project_id: shipment['project-id'],
        shipment_id: shipment['shipment-id'],
        _id: shipment._id,
        invoice_nr: shipment['invoice-nr'],
        invoice_amount: shipment['invoice-amount'],
        invoice_currency: shipment['invoice-currency'],
        project_resp: shipment['project-resp'],
        requested_date: shipment['requested-date'],
        status: shipment.status,
        documents_needed: shipment['documents-needed'],
        received_date: shipment['received-date'],
        notes_internal: shipment['notes-internal'],
        reminder_date: shipment['reminder-date'],
        invoice_nr_missing_cmr: shipment['invoice-nr-missing-cmr'],
        _acl: {"creator": shipment._acl.creator},
        _kmd: {"ect": shipment._kmd.ect}
      }
    });
  }

  onSubmit() {
    this.shipment._id = this.shipment.shipment_id;
    let shipmentData = {
      customer: this.shipment.customer,
      haulier: this.shipment.haulier,
      trailer: this.shipment.trailer,
      'loading-address': this.shipment.loading_address,
      'unloading-address': this.shipment.unloading_address,
      'delivery-date': this.shipment.delivery_date,
      'project-id': this.shipment.project_id,
      'shipment-id': this.shipment.shipment_id,
      _id: this.shipment._id,
      'invoice-nr': this.shipment.invoice_nr,
      'invoice-amount': this.shipment.invoice_amount,
      'invoice-currency': this.shipment.invoice_currency,
      'project-resp': this.shipment.project_resp,
      'requested-date': this.shipment.requested_date,
      status: this.shipment.status,
      'documents-needed': this.shipment.documents_needed,
      'received-date': this.shipment.received_date,
      'notes-internal': this.shipment.notes_internal,
      'reminder-date': this.shipment.reminder_date,
      'invoice-nr-missing-cmr': this.shipment.invoice_nr_missing_cmr
    }

    this.shipmentService.editShipment(this.shipmentId, shipmentData).subscribe(r => {
      console.log(r);
      this.router.navigate(['/shipments']);
    })
  }

  deleteShipment(shipmentId: string): void {
    if(this.user.roles.includes('Admin')) {
      this.shipmentService.deleteShipment(shipmentId).subscribe(r => {
        this.router.navigate(['/shipments']);
      })
    }
  }
}
