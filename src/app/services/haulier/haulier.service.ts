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

  getAllHauliers(): Observable<Haulier[]> {
    return this.http.get<Haulier[]>(
      `https://baas.kinvey.com/appdata/${config.kinveyAppKey}/hauliers`,
      {
        headers: {
          'Authorization': `Kinvey ${sessionStorage.getItem('authtoken')}`
        }
      }
    )
  }

  addHaulier(haulier: object): Observable<Haulier> {
    return this.http.post<any>(
      `https://baas.kinvey.com/appdata/${config.kinveyAppKey}/hauliers`,
      JSON.stringify(haulier),
      {
        headers: {
          'Authorization': `Kinvey ${sessionStorage.getItem('authtoken')}`,
          'Content-Type': 'application/json'
        }
      }
    )
  }

  editHaulier(haulierId: string, haulier: object): Observable<Haulier> {
    return this.http.put<any>(
      `https://baas.kinvey.com/appdata/${config.kinveyAppKey}/hauliers/${haulierId}`,
      JSON.stringify(haulier),
      {
        headers: {
          'Authorization': `Kinvey ${sessionStorage.getItem('authtoken')}`,
          'Content-Type': 'application/json'
        }
      }
    )
  }
}
