//Import Statements

import { Component } from '@angular/core';
import { DataModel } from 'src/app/ludyModel/data-model';
import { DataService } from 'src/app/ludyServices/data.service';

//Component Decoration
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})

//Class Definition
export class TableComponent {
  //Properties: Declares a property to store an array of DataModel objects
  public data: DataModel[] = [];

  /* Constructor: Initializes the component by making an HTTP
 request to the backend using the DataService to get data 
 for the table.Subscribes to the observable returned by 
 getAllDataFromCompteurs() and populates the data property 
 with the received data. Logs the data to the console (for debugging purposes). */

  constructor(private dataServ: DataService) {
    this.dataServ.getAllDataFromCompteurs().subscribe((fromAPI: any) => {
      this.data = fromAPI;
      console.log(this.data);
    });
  }
}
