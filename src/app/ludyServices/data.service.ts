import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  apiUrl = environment.apiURL;
  mesDonnees = this.apiUrl + 'data/mes-donnees';

  constructor(private http: HttpClient) { 
    //this.getAllData();
  }


  getAllDataFromCompteur1(){
    return this.http.get("http://127.0.0.1:5000/api/data/compteur1");
  }

  
}
