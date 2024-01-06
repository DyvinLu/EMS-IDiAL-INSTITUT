import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { DataModel } from 'src/app/ludyModel/data-model';
import { DataService } from 'src/app/ludyServices/data.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  chart: any = [];

  public data: DataModel[] = [];

  xValues: any[] = [];
  yValues1: number[] = [];
  yValues2: number[] = [];

  constructor(private dataServ: DataService){

    // data 1
    this.dataServ.getAllDataFromCompteur1().subscribe((fromAPI:any)=>{
      this.data = fromAPI;
      console.log(this.data);

      for(var item of this.data){
        this.xValues.push(item._time);
        this.yValues1.push(item._value)
      }

      this.chart = new Chart('canvas', {
        type: 'line',
        data: {
          labels: this.xValues,
          datasets: [
            {
              label: this.data[0].device,
              data: this.yValues1,
              borderWidth: 1,
            },
            {
              label: this.data[0].device,
              data: this.yValues1,
              borderWidth: 1,
            }
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });

    });

    
   
  }


  ngOnInit() {

   
  }

}
