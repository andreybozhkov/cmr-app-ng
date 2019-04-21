import { Injectable } from '@angular/core';
import config from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Shipment } from 'src/app/dataClasses/shipment';

@Injectable({
  providedIn: 'root'
})
export class ShipmentService {

  constructor(private http: HttpClient) { }

  getShipments(): Observable<Array<Shipment>> {
    return this.http.get<Array<Shipment>>(
      `https://baas.kinvey.com/appdata/${config.kinveyAppKey}/shipments`,
      {
        headers: {
          'Authorization': `Kinvey ${sessionStorage.getItem('authtoken')}`
        }
      }
    );
  }
}
    