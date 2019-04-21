import { Component, OnInit } from '@angular/core';
import { Shipment } from 'src/app/dataClasses/shipment';
import { HaulierService } from 'src/app/services/haulier/haulier.service';
import { Haulier } from 'src/app/dataClasses/haulier';
import { ShipmentService } from 'src/app/services/shipment/shipment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-shipment',
  templateUrl: './create-shipment.component.html',
  styleUrls: ['./create-shipment.component.css']
})
export class CreateShipmentComponent implements OnInit {

  constructor(private haulierService: HaulierService, private shipmentService: ShipmentService, private router: Router) { }

  shipment: Shipment = {
    customer: '',
    haulier: '',
    trailer: '',
    loading_address: '',
    unloading_address: '',
    delivery_date: new Date(),
    project_id: '',
    shipment_id: '',
    _id: '',
    invoice_nr: 0,
    invoice_amount: 0,
    invoice_currency: '',
    project_resp: '',
    requested_date: new Date(),
    status: '',
    documents_needed: [],
    received_date: new Date(),
    notes_internal: '',
    reminder_date: new Date(),
    invoice_nr_missing_cmr: '',
    _acl: {"creator": ''}
  }
  hauliers: Haulier[];

  ngOnInit() {
    this.haulierService.getAllHauliers().subscribe(hauliers => {
      this.hauliers = hauliers;
    })
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

    this.shipmentService.createShipment(shipmentData).subscribe(r => this.router.navigate(['/shipments']));
  }
}
