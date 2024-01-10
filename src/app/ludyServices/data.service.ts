import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  apiUrl = environment.apiURL;
  mesDonnees = this.apiUrl + 'data/compteurs';

  constructor(private http: HttpClient) { 
    //this.getAllData();
  }


  getAllDataFromCompteurs(){
    return this.http.get("http://localhost:5000/api/data/compteurs/live"); // cette ligne permet d'appeler le backend
  }

  
}
