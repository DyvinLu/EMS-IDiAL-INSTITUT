import { Component } from '@angular/core';
import { DataService } from 'src/app/ludyServices/data.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {

  messageTest!: string;

  constructor(private dataService: DataService){

  }


  ngOnInit(){
    this.dataService.getAllData().subscribe((res:any)=>{
      console.log(res);
      this.messageTest = res?.content;
    })
  }

}
