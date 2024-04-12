import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ZaehlerOptions } from '../app.type';

@Injectable({
  providedIn: 'root',
})

//Class Definition:Defines the DataService class
export class DataService {
  
  constructor(private http: HttpClient) {
  }

  getAllDataFromCompteurs() {
    return this.http.get<any[][]>('http://localhost:5000/api/data/compteurs/live'); // cette ligne permet d'appeler le backend
  }

  DataFromShelly(ruf: ZaehlerOptions) {
    return this.http.post<any[]>('http://localhost:5000/api/data/shelly', ruf); // cette ligne permet d'appeler le backend
  }

  DataFromHauptZaehler(ruf: ZaehlerOptions) {
    return this.http.post<any[]>( 'http://localhost:5000/api/data/hauptzaehler', ruf); // cette ligne permet d'appeler le backend
  }
}
