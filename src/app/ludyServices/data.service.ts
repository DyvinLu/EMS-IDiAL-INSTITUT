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
  providedIn: 'root'
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
  getAllDataFromCompteurs(){
    return this.http.get("http://localhost:5000/api/data/compteurs/live"); // cette ligne permet d'appeler le backend
  }

  DataFromShelly3emOhs2305(ruf: RufZaehler){
    return this.http.post("http://localhost:5000/api/data/compteurs/Shelly3emOhs2305", ruf); // cette ligne permet d'appeler le backend
  }

  DataFromShelly3emOhs2304(ruf: RufZaehler){
    return this.http.post("http://localhost:5000/api/data/compteurs/Shelly3emOhs2304", ruf); // cette ligne permet d'appeler le backend
  }

  DataFromShelly3emOhs2303(ruf: RufZaehler){
    return this.http.post("http://localhost:5000/api/data/compteurs/Shelly3emOhs2303", ruf); // cette ligne permet d'appeler le backend
  }

  DataFromShelly3emOhs2302(ruf: RufZaehler){
    return this.http.post("http://localhost:5000/api/data/compteurs/Shelly3emOhs2302", ruf); // cette ligne permet d'appeler le backend
  }
  DataFromShelly3emOhs2301(ruf: RufZaehler){
    return this.http.post("http://localhost:5000/api/data/compteurs/Shelly3emOhs2301", ruf); // cette ligne permet d'appeler le backend
  }

  DataFromEBZDD3(ruf: RufZaehler){
    return this.http.post("http://localhost:5000/api/data/compteurs/EBZDD3", ruf); // cette ligne permet d'appeler le backend
  }
  DataFromITRON(ruf: RufZaehler){
    return this.http.post("http://localhost:5000/api/data/compteurs/ITRON", ruf); // cette ligne permet d'appeler le backend
  }

  
}
