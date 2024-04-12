//Import Statements

import { Component } from '@angular/core';
import { map } from 'rxjs';
import { DataService } from 'src/app/services/data.service';

//Component Decoration
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html'
})

//Class Definition
export class TableComponent {
  //Properties: Declares a property to store an array of DataModel objects
  protected data: any[] = [];

  constructor(private dataServ: DataService) {
    this.dataServ
      .getAllZaehlerFromDB()
      .pipe(
        map((dataFromDB) =>
          dataFromDB.flatMap((item) => item)
        )
      )
      .subscribe((zaehlerModel) => {
        this.data = zaehlerModel;
      });
  }
}
