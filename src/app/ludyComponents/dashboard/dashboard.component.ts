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
  areaChart: any = [];

  compteur1 = "shelly-3em-ohs23-01";
  compteur2 = "shelly-3em-ohs23-02";

  public data: DataModel[] = [];

  xValues: any[] = [];
  yValues1: number[] = [];
  yValues2: number[] = [];
  yValues3: number[] = [];
  yValues4: number[] = [];
  yValues5: number[] = [];
  yValues6: number[] = [];
  
  constructor(private dataServ: DataService){

    // data 1
    this.dataServ.getAllDataFromCompteurs().subscribe((fromAPI:any)=>{
      this.data = fromAPI;
      //console.log(this.data);

      for(var item of this.data){ // parcourir la liste des donnees
        if(item.device === this.compteur1){
          this.xValues.push(item._time);
          this.yValues1.push(item._value)
        }else if(item.device === this.compteur2){
          this.yValues2.push(item._value)
        }else if(item.device === "shelly-3em-ohs23-03"){
          this.yValues3.push(item._value)
        }else if(item.device === "shelly-3em-ohs23-04"){
          this.yValues4.push(item._value)
        }else if(item.device === "shelly-3em-ohs23-05"){
          this.yValues5.push(item._value)
        }else if(item.device === "shellyem3-485519C9734D"){
          this.yValues6.push(item._value)
        }
        
      }

      this.chart = new Chart('canvas', {
        type: 'line',
        data: {
          labels: this.xValues,
          datasets: [
            {
              label: this.compteur1,
              data: this.yValues1,
              borderWidth: 1,
            },
            {
              label: this.compteur2,
              data: this.yValues2,
              borderWidth: 1,
            },
            {
              label: "compteur3",
              data: this.yValues3,
              borderWidth: 1,
            },
            {
              label: "compteur4",
              data: this.yValues4,
              borderWidth: 1,
            },
            {
              label: "compteur5",
              data: this.yValues5,
              borderWidth: 1,
            },
            {
              label: "compteur6",
              data: this.yValues6,
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

      // todo: areaChart

    });

    
   
  }


  ngOnInit() {

   
  }

}
