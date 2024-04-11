/*This is an Angular service (DataService) responsible
for making HTTP requests to interact with a backend server */

/*Importing Angular Modules and Environment
HttpClient for making HTTP requests, Injectable for 
defining a service, and the environment configuration */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RufZaehler } from '../ludyModel/ruf-zaehler';

/*Service Decoration:Decorates the service with @Injectable 
and specifies that it should be provided at the root level */
@Injectable({
  providedIn: 'root',
})

//Class Definition:Defines the DataService class
export class DataService {
  /* API URL Configuration:Retrieves the API URL from 
the environment configuration (environment.apiURL) 
and constructs the mesDonnees URL for the "compteurs" endpoint */
  apiUrl = environment.apiURL;
  mesDonnees = this.apiUrl + 'data/compteurs';

  /* Constructor: Constructor initializes the service 
with the HttpClient for making HTTP requests  */
  constructor(private http: HttpClient) {
    //this.getAllData();
  }

  /* HTTP Request Method: Defines a method getAllDataFromCompteurs()
  that makes an HTTP GET request to the specified endpoint */

  getAllDataFromCompteurs() {
    return this.http.get<any[][]>('http://localhost:5000/api/data/compteurs/live'); // cette ligne permet d'appeler le backend
  }

  DataFromShelly(ruf: RufZaehler) {
    return this.http.post<any[]>('http://localhost:5000/api/data/shelly', ruf); // cette ligne permet d'appeler le backend
  }

  DataFromHauptZaehler(ruf: RufZaehler) {
    const res = this.http.post<any[]>( 'http://localhost:5000/api/data/hauptzaehler', ruf); // cette ligne permet d'appeler le backend
    res.subscribe((data) => console.log(data))
    return res;
  }
}
