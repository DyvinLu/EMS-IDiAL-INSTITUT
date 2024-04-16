import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ZaehlerOptions } from '../app.type';

@Injectable({
  providedIn: 'root',
})

export class DataService {
  constructor(private http: HttpClient) {}

  getAllZaehlerFromDB() {
    return this.http.get<any[][]>(
      'http://localhost:5000/api/data/compteurs/live'
    );
  }

  getShellyFromDB(ruf: ZaehlerOptions) {
    return this.http.post<any[]>('http://localhost:5000/api/data/shelly', ruf); // cette ligne permet d'appeler le backend
  }

  getHauptZaehlerFromDB(ruf: ZaehlerOptions) {
    return this.http.post<any[]>(
      'http://localhost:5000/api/data/hauptzaehler',
      ruf
    );
  }
}
