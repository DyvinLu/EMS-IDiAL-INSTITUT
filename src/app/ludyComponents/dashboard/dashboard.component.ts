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

  dps1: any = []; dps2: any = []; dps3: any = []; charts: any = [];
	
	toolTip = {
		shared: true
	};
	legend = {
		cursor: "pointer",
		itemclick: function (e: any) {
		  if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
			e.dataSeries.visible = false;
		  } else {
			e.dataSeries.visible = true;
		  }
		  e.chart.render();
		}
	};
	
	systemDps: any = []; userDps: any = []; waitDps: any = []; buffersDps: any = []; cacheDps: any = []; usedDps: any = []; inboundDps: any = []; outboundDps: any = []; writeDps: any= []; readDps: any = [];
	onToolTipUpdated: any; onToolTipHidden: any; onCrosshairUpdated: any; onCrosshairHidden: any; onRangeChanged: any;

/* Properties:Declares properties for storing chart instances, 
counter identifiers (Zähler1 to Zähler5), and arrays for x and y values  */ 
  areachart: any = [];
  barChart: any = [];
  pieChart: any = [];
 

  Hauptzähler1 = "XX-06";
  Hauptzähler2 = "XX-07";
  Zähler1 = "shelly-3em-ohs23-01";
  Zähler2 = "shelly-3em-ohs23-02";
  Zähler3 = "shelly-3em-ohs23-03";
  Zähler4 = "shelly-3em-ohs23-04";
  Zähler5 = "shelly-3em-ohs23-05";

  public data: DataModel[] = [];

  xValues: any[] = [];
  sumHauptzähler1: any = 0;
  sumHauptzähler2: any = 0;
  sumZähler1: any = 0;
  sumZähler2: any = 0;
  sumZähler3: any = 0;
  sumZähler4: any = 0;
  sumZähler5: any = 0;
  yValues1: number[] = [];
  yValues2: number[] = [];
  yValues3: number[] = [];
  yValues4: number[] = [];
  yValues5: number[] = [];
  yValues6: number[] = [];
  yValues7: number[] = [];
  

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
        if(item.device === this.Hauptzähler1){
          this.xValues.push(item._time);
          this.yValues1.push(item._value);
          this.sumHauptzähler1 = this.sumHauptzähler1 + item._value;
        }else if(item.device === this.Hauptzähler2){
          this.yValues2.push(item._value)
          this.Hauptzähler2 = this.Hauptzähler2 + item._value;
        }else if(item.device === this.Zähler1){
          this.yValues3.push(item._value)
          this.sumZähler1 = this.sumZähler1 + item._value;
        }else if(item.device === this.Zähler2){
          this.yValues4.push(item._value)
          this.sumZähler2 = this.sumZähler2 + item._value;
        }else if(item.device === this.Zähler3){
          this.yValues5.push(item._value)
          this.sumZähler3 = this.sumZähler3+ item._value;
        }else if(item.device === this.Zähler4){
          this.yValues6.push(item._value)
          this.sumZähler4 = this.sumZähler4 + item._value;
        }else if(item.device === this.Zähler5){
          this.yValues7.push(item._value)
          this.sumZähler5 = this.sumZähler5 + item._value;
        }
      }

      this.areachart = {
        animationEnabled: true,
        title: {
        text: "Live Energieverbrauch"             
        },
        axisY: {
        title: "Mittlere Leistung pro Minute in Kilowatt"
        },
        data: [{
        type: "area",     
        name: "Received",
        showInLegend: true,
        legendMarkerType: "square",
        color: "rgba(40,175,101,0.6)",
        markerSize: 0,            
        dataPoints: [
          {x:new Date(2013,0,1,0,0), y: 7, label: "midnight"  },
          {x:new Date(2013,0,1,1,0), y: 8},
          {x:new Date(2013,0,1,2,0), y: 5},
          {x:new Date(2013,0,1,3,0), y: 7},
          {x:new Date(2013,0,1,4,0), y: 6},
          {x:new Date(2013,0,1,5,0), y: 8},
          {x:new Date(2013,0,1,6,0), y: 12},
          {x:new Date(2013,0,1,7,0), y: 24},
          {x:new Date(2013,0,1,8,0), y: 36},
          {x:new Date(2013,0,1,9,0), y: 35},
          {x:new Date(2013,0,1,10,0), y: 37},
          {x:new Date(2013,0,1,11,0), y: 29},         
          {x:new Date(2013,0,1,12,0), y: 34, label: "noon" },                
          {x:new Date(2013,0,1,13,0), y: 38},
          {x:new Date(2013,0,1,14,0), y: 23},
          {x:new Date(2013,0,1,15,0), y: 31},
          {x:new Date(2013,0,1,16,0), y: 34},
          {x:new Date(2013,0,1,17,0), y: 29},
          {x:new Date(2013,0,1,18,0), y: 14},
          {x:new Date(2013,0,1,19,0), y: 12},
          {x:new Date(2013,0,1,20,0), y: 10},
          {x:new Date(2013,0,1,21,0), y: 8},
          {x:new Date(2013,0,1,22,0), y: 13},
          {x:new Date(2013,0,1,23,0), y: 11} 
        ]
        }, {
        type: "area",
        name: "Sent",
        showInLegend: true,
        legendMarkerType: "square",
        color: "rgba(0,75,141,0.7)",
        markerSize: 0,
        dataPoints: [
          {x:new Date(2013,0,1,0,0), y: 12, label: "midnight"  },
          {x:new Date(2013,0,1,1,0), y: 10},
          {x:new Date(2013,0,1,2,0), y: 3},
          {x:new Date(2013,0,1,3,0), y: 5},
          {x:new Date(2013,0,1,4,0), y: 2},
          {x:new Date(2013,0,1,5,0), y: 1},
          {x:new Date(2013,0,1,6,0), y: 3},
          {x:new Date(2013,0,1,7,0), y: 6},
          {x:new Date(2013,0,1,8,0), y: 14},
          {x:new Date(2013,0,1,9,0), y: 15},
          {x:new Date(2013,0,1,10,0), y: 21},
          {x:new Date(2013,0,1,11,0), y: 24},         
          {x:new Date(2013,0,1,12,0), y: 28, label: "noon" },                
          {x:new Date(2013,0,1,13,0), y: 26},
          {x:new Date(2013,0,1,14,0), y: 17},
          {x:new Date(2013,0,1,15,0), y: 23},
          {x:new Date(2013,0,1,16,0), y: 28},
          {x:new Date(2013,0,1,17,0), y: 22},
          {x:new Date(2013,0,1,18,0), y: 10},
          {x:new Date(2013,0,1,19,0), y: 9},
          {x:new Date(2013,0,1,20,0), y: 6},
          {x:new Date(2013,0,1,21,0), y: 4},
          {x:new Date(2013,0,1,22,0), y: 12},
          {x:new Date(2013,0,1,23,0), y: 14}
        ]
        }]
      }


      this.barChart = new Chart('barChart', {
        type: 'bar',
        data: {
          labels: this.xValues,
          datasets: [
            {
              label: this.Hauptzähler1,
              data: this.yValues1,
              borderWidth: 1,
            },
            {
              label: this.Hauptzähler2,
              data: this.yValues2,
              borderWidth: 1,
            },
            {
              label: this.Zähler1,
              data: this.yValues3,
              borderWidth: 1,
            },
            {
              label: this.Zähler2,
              data: this.yValues4,
              borderWidth: 1,
            },
            {
              label: this.Zähler3,
              data: this.yValues5,
              borderWidth: 1,
            },
            {
              label: this.Zähler4,
              data: this.yValues6,
              borderWidth: 1,
            },
            {
              label: this.Zähler5,
              data: this.yValues7,
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
            'XX-06',
            'XX-07',
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
                this.sumHauptzähler1,
                this.sumHauptzähler2,
                this.sumZähler1, 
                this.sumZähler2, 
                this.sumZähler3, 
                this.sumZähler4, 
                this.sumZähler5, 
              ],
              backgroundColor: [
                'Red', 'Pink','Green','Yellow','Orange', 'Black' , 'blue'
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

  getChartInstance = (chart: any) => {		
    this.charts.push(chart);
  }

}
