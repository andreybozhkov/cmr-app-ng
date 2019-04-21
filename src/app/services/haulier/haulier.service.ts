import { Injectable } from '@angular/core';
import config from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Haulier } from 'src/app/dataClasses/haulier';


@Injectable({
  providedIn: 'root'
})
export class HaulierService {

  constructor(private http: HttpClient) { }

  getHaulierById(haulierId: string): Observable<Haulier> {
    return this.http.get<Haulier>(
      `https://baas.kinvey.com/appdata/${config.kinveyAppKey}/hauliers/${haulierId}`,
      {
        headers: {
          'Authorization': `Kinvey ${sessionStorage.getItem('authtoken')}`
        }
      }
    )
  }
}
