//Import Statements:Imports necessary Angular modules and services

import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { DataModel } from 'src/app/ludyModel/data-model';
import { DataService } from 'src/app/ludyServices/data.service';

/* Component Decoration: Decorates the class as an Angular 
component with a specific selector, template, and styles. */

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

//Defines the DashboardComponent class, implementing the OnInit interface
export class DashboardComponent implements OnInit{

/* Properties:Declares properties for storing chart instances, 
counter identifiers (Zähler1 to Zähler5), and arrays for x and y values  */ 
  lineChart: any = [];
  barChart: any = [];
  pieChart: any = [];

  Zähler1 = "shelly-3em-ohs23-01";
  Zähler2 = "shelly-3em-ohs23-02";
  Zähler3 = "shelly-3em-ohs23-03";
  Zähler4 = "shelly-3em-ohs23-04";
  Zähler5 = "shelly-3em-ohs23-05";

  public data: DataModel[] = [];

  xValues: any[] = [];
  yValues1: number[] = [];
  sumZähler1: any = 0;
  sumZähler2: any = 0;
  sumZähler3: any = 0;
  sumZähler4: any = 0;
  sumZähler5: any = 0;
  yValues2: number[] = [];
  yValues3: number[] = [];
  yValues4: number[] = [];
  yValues5: number[] = [];
  

/* Constructor:Initializes the component, including making
an HTTP request to the backend using the DataService to 
get data for the chart */

    constructor(private dataServ: DataService){

/* HTTP Request and Chart Creation: Makes an HTTP request to
the backend using dataServ.getAllDataFromCompteurs() 
Processes the data received and populates arrays for x and y values for each counter
Creates a line chart using Chart.js with multiple datasets representing each counter*/
    // data 1
    this.dataServ.getAllDataFromCompteurs().subscribe((fromAPI:any)=>{
      this.data = fromAPI;
      //console.log(this.data);

      for(var item of this.data){ // parcourir la liste des donnees
        if(item.device === this.Zähler1){
          this.xValues.push(item._time);
          this.yValues1.push(item._value);
          this.sumZähler1 = this.sumZähler1 + item._value;
        }else if(item.device === this.Zähler2){
          this.yValues2.push(item._value)
          this.sumZähler2 = this.sumZähler2 + item._value;
        }else if(item.device === this.Zähler3){
          this.yValues3.push(item._value)
          this.sumZähler3 = this.sumZähler3 + item._value;
        }else if(item.device === this.Zähler4){
          this.yValues4.push(item._value)
          this.sumZähler4 = this.sumZähler4+ item._value;
        }else if(item.device === this.Zähler5){
          this.yValues5.push(item._value)
          this.sumZähler5 = this.sumZähler5 + item._value;
        }
      }

      this.lineChart = new Chart('lineChart', {
        type: 'line',
        data: {
          labels: this.xValues,
          datasets: [
            {
              label: this.Zähler1,
              data: this.yValues1,
              borderWidth: 1,
            },
            {
              label: this.Zähler2,
              data: this.yValues2,
              borderWidth: 1,
            },
            {
              label: this.Zähler3,
              data: this.yValues3,
              borderWidth: 1,
            },
            {
              label: this.Zähler4,
              data: this.yValues4,
              borderWidth: 1,
            },
            {
              label: this.Zähler5,
              data: this.yValues5,
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


      this.barChart = new Chart('barChart', {
        type: 'bar',
        data: {
          labels: this.xValues,
          datasets: [
            {
              label: this.Zähler1,
              data: this.yValues1,
              borderWidth: 1,
            },
            {
              label: this.Zähler2,
              data: this.yValues2,
              borderWidth: 1,
            },
            {
              label: this.Zähler3,
              data: this.yValues3,
              borderWidth: 1,
            },
            {
              label: this.Zähler4,
              data: this.yValues4,
              borderWidth: 1,
            },
            {
              label: this.Zähler5,
              data: this.yValues5,
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


      this.pieChart = new Chart("pieChart", {
        type: 'pie', //this denotes tha type of chart
  
        data: {// values on X-Axis
          labels: [
            'shelly-3em-ohs23-01',
            'shelly-3em-ohs23-02',
            'shelly-3em-ohs23-03',
            'shelly-3em-ohs23-04',
            'shelly-3em-ohs23-05',
           ],
          datasets: [
            {
              label: 'Gesamtverbrauch',
              data: [
                this.sumZähler1, 
                this.sumZähler2, 
                this.sumZähler3, 
                this.sumZähler4, 
                this.sumZähler5, 
              ],
              backgroundColor: [
                'Red', 'Pink','Green','Yellow','Orange', 
              ],
              hoverOffset: 4
            },
          ],
        },
        options: {
          aspectRatio:2.5
        }
  
      });

    });

    
   
  }

//ngOnInit Method
  ngOnInit() {

   
  }

}
