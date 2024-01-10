import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { DataModel } from 'src/app/ludyModel/data-model';
import { DataService } from 'src/app/ludyServices/data.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {

  public data: DataModel[] = [];

  constructor(private dataServ: DataService){
    this.dataServ.getAllDataFromCompteurs().subscribe((fromAPI:any)=>{
      this.data = fromAPI;
      console.log(this.data);
    });
  }


}
