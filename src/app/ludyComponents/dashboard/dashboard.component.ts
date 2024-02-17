//Import Statements:Imports necessary Angular modules and services

import { Component, OnInit } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
//import Chart from 'chart.js/auto';
import { sortByProperty } from 'sort-by-property';
import { DataModel } from 'src/app/ludyModel/data-model';
import { RufZaehler } from 'src/app/ludyModel/ruf-zaehler';
import { DataService } from 'src/app/ludyServices/data.service';

import {  Chart, ChartType,} from 'chart.js';



declare var $:any;


/* Component Decoration: Decorates the class as an Angular 
component with a specific selector, template, and styles. */

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
  
})

//Defines the DashboardComponent class, implementing the OnInit interface
export class DashboardComponent implements OnInit{

  lineChart: any = [];
  barChart: any = [];
  pieChart: any = [];
  areaChart: any = []

  Zähler1 = "shelly-3em-ohs23-01";
  Zähler2 = "shelly-3em-ohs23-02";
  Zähler3 = "shelly-3em-ohs23-03";
  Zähler4 = "shelly-3em-ohs23-04";
  Zähler5 = "shelly-3em-ohs23-05";
  Zähler6 = "shellyem3-485519C9734D";

  public data: DataModel[] = [];

  xValues: any[] = [];
  yValues1: number[] = [];
  sumZähler1: any = 0;
  sumZähler2: any = 0;
  sumZähler3: any = 0;
  sumZähler4: any = 0;
  sumZähler5: any = 0;
  sumZähler6: any = 0;
  yValues2: number[] = [];
  yValues3: number[] = [];
  yValues4: number[] = [];
  yValues5: number[] = [];
  yValues6: number[] = [];
  

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
        }else if(item.device === this.Zähler6){
          this.yValues6.push(item._value)
          this.sumZähler6 = this.sumZähler6 + item._value;
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
            },
            {
              label: this.Zähler6,
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

      const areaChartData = {
        labels  : ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label               : 'Digital Goods',
            backgroundColor     : 'rgba(60,141,188,0.9)',
            borderColor         : 'rgba(60,141,188,0.8)',
            pointRadius          : false,
            pointColor          : '#3b8bba',
            pointStrokeColor    : 'rgba(60,141,188,1)',
            pointHighlightFill  : '#fff',
            pointHighlightStroke: 'rgba(60,141,188,1)',
            data                : [28, 48, 40, 19, 86, 27, 90]
          },
          {
            label               : 'Electronics',
            backgroundColor     : 'rgba(210, 214, 222, 1)',
            borderColor         : 'rgba(210, 214, 222, 1)',
            pointRadius         : false,
            pointColor          : 'rgba(210, 214, 222, 1)',
            pointStrokeColor    : '#c1c7d1',
            pointHighlightFill  : '#fff',
            pointHighlightStroke: 'rgba(220,220,220,1)',
            data                : [65, 59, 80, 81, 56, 55, 40]
          },
        ]
      }
  
      const areaChartOptions: any = {
        maintainAspectRatio: false,
        responsive: true,
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            gridLines: {
              display: false,
            }
          }],
          yAxes: [{
            gridLines: {
              display: false,
            }
          }]
        }
      }

      
      /*this.areaChart = new Chart("areaChart3", {
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
            },
            {
              label: this.Zähler6,
              data: this.yValues6,
              borderWidth: 1,
            }
          ],
        },
        options: areaChartOptions,
      })*/

      
      let toSend = new RufZaehler();
      toSend.timeRange = 1;
      toSend.zaehlerName = "shelly-3em-ohs23-01";

      dataServ.DataFromShelly3emOhs2301(toSend).subscribe(data=>{

       
      })

    });

    
   
  }

  /*dps1: any = []; dps2: any = []; dps3: any = []; charts: any = [];

  dataVisual!: any[];

  myForm!:any;

  barChart!:any;
	
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


  multiAreaChart = {
    animationEnabled: true,
      title: {
          text: 'Live Energieverbrauch',
      },
      axisY: {
          title: 'Verbrauch in Kilowatt',
      },
  };

  allData: any[] = [];

  stackedChart!:any;
 
  shelly01!:any;
  shelly02!:any;
  shelly03!:any;
  shelly04!: any;
  shelly05!: any;

  xx06!: any;
  xx07!: any;
 
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


  Zähler5 = "shelly-3em-ohs23-05";

  zaehlerNamen = [
    "shelly-3em-ohs23-01",
    "shelly-3em-ohs23-02",
    "shelly-3em-ohs23-03",
    "shelly-3em-ohs23-04",
    "shelly-3em-ohs23-05",
  ]

  hauptzaehlerNamen = [
    "XX-06",
    "XX-07",
  ]
 
  

    constructor(private dataServ: DataService){


  
    let sendToBAck1 = new RufZaehler();
    sendToBAck1.timeRange = 5,
    sendToBAck1.zaehlerName = "shelly-3em-ohs23-01";
    this.dataServ.DataFromShelly3emOhs2301(sendToBAck1).subscribe((fromApi:any)=>{
      let dataPts = [];
      for(var item of fromApi){ // parcourir la liste des donnees
          const xyValue = {
            x: new Date(item._time),
            y: item._value,
          };

          dataPts.push(xyValue);
          this.yValues1.push(xyValue.y);
          this.xValues.push(xyValue.x)
          
      }
    
      dataPts.sort((b:any, a:any) => b.x.getTime() - a.x.getTime());

      this.shelly01 = {
        type: 'area',
        name: 'ZaehlerName 1',
        showInLegend: true,
        legendMarkerType: 'square',
        color: 'rgba(138, 58, 45,0.8)',
        markerSize: 0,
        dataPoints: dataPts,
      };
     
      this.allData.push(this.shelly01);

    });

    
 

    
    let sendToBAck2 = new RufZaehler();
    sendToBAck2.timeRange = 5,
    sendToBAck2.zaehlerName = "shelly-3em-ohs23-02";
    this.dataServ.DataFromShelly3emOhs2302(sendToBAck2).subscribe((fromApi:any)=>{
      let dataPts = [];
      for(var item of fromApi){ // parcourir la liste des donnees
          const xyValue = {
            x: new Date(item._time),
            y: item._value,
          };

          dataPts.push(xyValue);
      }
    
      dataPts.sort((b:any, a:any) => b.x.getTime() - a.x.getTime());

      this.shelly02 = {
        type: 'area',
        name: 'ZaehlerName 2',
        showInLegend: true,
        legendMarkerType: 'square',
        color: 'rgba(182, 84, 214,0.3)',
        markerSize: 0,
        dataPoints: dataPts,
      };
     
      this.allData.push(this.shelly01);

    });

    let sendToBAck3 = new RufZaehler();
    sendToBAck3.timeRange = 5,
    sendToBAck3.zaehlerName = "shelly-3em-ohs23-03";
    this.dataServ.DataFromShelly3emOhs2303(sendToBAck3).subscribe((fromApi:any)=>{
      let dataPts = [];
      for(var item of fromApi){ // parcourir la liste des donnees
          const xyValue = {
            x: new Date(item._time),
            y: item._value,
          };

          dataPts.push(xyValue);
      }
    
      dataPts.sort((b:any, a:any) => b.x.getTime() - a.x.getTime());

      this.shelly03 = {
        type: 'area',
        name: 'ZaehlerName 3',
        showInLegend: true,
        legendMarkerType: 'square',
        color: 'rgba(176, 82, 53,0.8)',
        markerSize: 0,
        dataPoints: dataPts,
      };
     
      this.allData.push(this.shelly03);

    });

    let sendToBAck4 = new RufZaehler();
    sendToBAck4.timeRange = 5,
    sendToBAck4.zaehlerName = "shelly-3em-ohs23-04";
    this.dataServ.DataFromShelly3emOhs2304(sendToBAck4).subscribe((fromApi:any)=>{
      let dataPts = [];
      for(var item of fromApi){ // parcourir la liste des donnees
          const xyValue = {
            x: new Date(item._time),
            y: item._value,
          };

          dataPts.push(xyValue);
      }
    
      dataPts.sort((b:any, a:any) => b.x.getTime() - a.x.getTime());

      this.shelly04 = {
        type: 'area',
        name: 'ZaehlerName 4',
        showInLegend: true,
        legendMarkerType: 'square',
        color: 'rgba(0,75,141,0.7)',
        markerSize: 0,
        dataPoints: dataPts,
      };
     
      this.allData.push(this.shelly04);

    });

    let sendToBAck5 = new RufZaehler();
    sendToBAck5.timeRange = 5,
    sendToBAck5.zaehlerName = "shelly-3em-ohs23-05";
    this.dataServ.DataFromShelly3emOhs2305(sendToBAck5).subscribe((fromApi:any)=>{
      let dataPts = [];
      for(var item of fromApi){ // parcourir la liste des donnees
        const xyValue = {
          x: new Date(item._time),
          y: item._value,
        };
        dataPts.push(xyValue);
      }

      dataPts.sort((b:any, a:any) => b.x.getTime() - a.x.getTime());
    
      this.shelly05 = {
        type: 'area',
        name: 'ZaehlerName 5',
        showInLegend: true,
        legendMarkerType: 'square',
        color: 'rgba(40,175,101,0.6)',
        markerSize: 0,
        dataPoints: dataPts,
      };
      
     
      this.allData.push(this.shelly05);

    });

    let sendToBAck6 = new RufZaehler();
    sendToBAck6.timeRange = 5,
    sendToBAck6.zaehlerName = "XX-06";
    this.dataServ.DataFromShelly3emOhs2305(sendToBAck6).subscribe((fromApi:any)=>{
      let dataPts = [];
      for(var item of fromApi){ // parcourir la liste des donnees
        const xyValue = {
          x: new Date(item._time),
          y: item._value,
        };
        dataPts.push(xyValue);
      }

      dataPts.sort((b:any, a:any) => b.x.getTime() - a.x.getTime());
    
      this.xx06 = {
        type: 'area',
        name: 'hauptzaehler 1',
        showInLegend: true,
        legendMarkerType: 'square',
        color: 'rgba(94, 120, 140,0.6)',
        markerSize: 0,
        dataPoints: dataPts,
      };
      
     
      this.allData.push(this.xx06);

    });

    let sendToBAck7 = new RufZaehler();
    sendToBAck7.timeRange = 5,
    sendToBAck7.zaehlerName = "XX-07";
    this.dataServ.DataFromShelly3emOhs2305(sendToBAck7).subscribe((fromApi:any)=>{
      let dataPts = [];
      for(var item of fromApi){ // parcourir la liste des donnees
        const xyValue = {
          x: new Date(item._time),
          y: item._value,
        };
        dataPts.push(xyValue);
      }

      dataPts.sort((b:any, a:any) => b.x.getTime() - a.x.getTime());
    
      this.xx07 = {
        type: 'area',
        name: 'hauptzaehler 2',
        showInLegend: true,
        legendMarkerType: 'square',
        color: 'rgba(59, 112, 168,0.6)',
        markerSize: 0,
        dataPoints: dataPts,
      };
      
     
      this.allData.push(this.xx07);

    });



    const tmp = {data: this.allData}

    this.multiAreaChart = {...this.multiAreaChart, ...tmp};
    console.log("multiareaChart:",this.multiAreaChart);    
    

    this.barChart = new Chart('MyBarChart', {
      type: 'bar',
      data: {
        labels: this.xValues,
        datasets: [
          {
            label: "this.Hauptzähler1",
            data: this.yValues1,
            borderWidth: 1,
          },
          {
            label: "this.Hauptzähler2",
            data: this.yValues1,
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

    console.log("bar: ",this.barChart);
    
    
    
  }*/



//ngOnInit Method
  ngOnInit() {
   
  }


  getData(){
    $(function () {
      /* ChartJS
       * -------
       * Here we will create a few charts using ChartJS
       */
  
      //--------------
      //- AREA CHART -
      //--------------
  
      // Get context with jQuery - using jQuery's .get() method.
      var areaChartCanvas = $('#areaChart2').get(0).getContext('2d')
  
      var areaChartData = {
        labels  : ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label               : 'Digital Goods',
            backgroundColor     : 'rgba(60,141,188,0.9)',
            borderColor         : 'rgba(60,141,188,0.8)',
            pointRadius          : false,
            pointColor          : '#3b8bba',
            pointStrokeColor    : 'rgba(60,141,188,1)',
            pointHighlightFill  : '#fff',
            pointHighlightStroke: 'rgba(60,141,188,1)',
            data                : [28, 48, 40, 19, 86, 27, 90]
          },
          {
            label               : 'Electronics',
            backgroundColor     : 'rgba(210, 214, 222, 1)',
            borderColor         : 'rgba(210, 214, 222, 1)',
            pointRadius         : false,
            pointColor          : 'rgba(210, 214, 222, 1)',
            pointStrokeColor    : '#c1c7d1',
            pointHighlightFill  : '#fff',
            pointHighlightStroke: 'rgba(220,220,220,1)',
            data                : [65, 59, 80, 81, 56, 55, 40]
          },
        ]
      }
  
      const areaChartOptions: any = {
        maintainAspectRatio : false,
        responsive : true,
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            gridLines : {
              display : false,
            }
          }],
          yAxes: [{
            gridLines : {
              display : false,
            }
          }]
        }
      }
  
      // This will get the first returned node in the jQuery collection.
      new Chart(areaChartCanvas, {
        type: 'line' as ChartType,
        data: areaChartData,
        options: areaChartOptions
      })
  
      
  
      //---------------------
      //- STACKED BAR CHART -
      //---------------------
      /*var stackedBarChartCanvas = $('#stackedBarChart').get(0).getContext('2d')
      var stackedBarChartData = $.extend(true, {}, barChartData)
  
      var stackedBarChartOptions = {
        responsive              : true,
        maintainAspectRatio     : false,
        scales: {
          xAxes: [{
            stacked: true,
          }],
          yAxes: [{
            stacked: true
          }]
        }
      }
  
      new Chart(stackedBarChartCanvas, {
        type: 'bar',
        data: stackedBarChartData,
        options: stackedBarChartOptions
      })*/

    })
  }


}
