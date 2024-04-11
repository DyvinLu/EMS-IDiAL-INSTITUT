//Import Statements

import { Component } from '@angular/core';
import { map } from 'rxjs';
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
  protected data: DataModel[] = [];

  constructor(private dataServ: DataService) {
    this.dataServ
      .getAllDataFromCompteurs()
      .pipe(
        map<any[][], DataModel[]>((dataFromDB) =>
          dataFromDB.flatMap((item) => item)
        )
      )
      .subscribe((zaehlerModel) => {
        this.data = zaehlerModel;
      });
  }
}
