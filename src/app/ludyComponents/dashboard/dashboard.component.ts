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


  MyLineChart: any = [];
  barChart: any = [];
  areaChart: any = []

  Zähler1 = "shelly-3em-ohs23-01";
  Zähler2 = "shelly-3em-ohs23-02";
  Zähler3 = "shelly-3em-ohs23-03";
  Zähler4 = "shelly-3em-ohs23-04";
  Zähler5 = "shelly-3em-ohs23-05";
  Zähler6 = "shellyem3-485519C9734D";

  data: DataModel[] = [];

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
  
  dataVisual!: any;

  myForm!:any;


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
 
  sumHauptzähler1: any = 0;
  sumHauptzähler2: any = 0;
  yValues7: number[] = [];

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
    

    this.MyLineChart = new Chart('MyBarChart', {
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
  
    
  }



  //ngOnInit Method
  ngOnInit() {
    this.barChart = {
      animationEnabled: true,
      exportEnabled: true,
      title: {
          text: "Annual Expenses"
      },
      axisY: {
          prefix: "$"
      },
      toolTip: {
          shared: true,
          content: "{name}: ${y}"
      },
      legend: {
          fontSize: 13
      },
      data: [{
          type: "splineArea",
          showInLegend: true,
          name: "Salaries",
          markerSize: 0,
          color: "rgba(54,158,173,.9)",
          dataPoints: [
              { x: new Date(2020, 0), y: 3000000 },
              { x: new Date(2020, 1), y: 3500000 },
              { x: new Date(2020, 2), y: 3000000 },
              { x: new Date(2020, 3), y: 3040000 },
              { x: new Date(2020, 4), y: 2090000 },
              { x: new Date(2020, 5), y: 3100000 },
              { x: new Date(2020, 6), y: 3020000 },
              { x: new Date(2020, 7), y: 3000000 },
              { x: new Date(2020, 8), y: 3300000 },
              { x: new Date(2020, 9), y: 3800000 },
              { x: new Date(2020, 10), y: 3890000 },
              { x: new Date(2020, 11), y: 3900000 }
          ]
      },
      {
          type: "splineArea",
          showInLegend: true,
          name: "Office Cost",
          markerSize: 0,
          color: "rgba(134,180,2,.9)",
          dataPoints: [
              { x: new Date(2020, 0), y: 2010000 },
              { x: new Date(2020, 1), y: 1600000 },
              { x: new Date(2020, 2), y: 1400000 },
              { x: new Date(2020, 3), y: 1800000 },
              { x: new Date(2020, 4), y: 1800000 },
              { x: new Date(2020, 5), y: 2100000 },
              { x: new Date(2020, 6), y: 2200000 },
              { x: new Date(2020, 7), y: 2500000 },
              { x: new Date(2020, 8), y: 2300000 },
              { x: new Date(2020, 9), y: 2500000 },
              { x: new Date(2020, 10), y: 2600000 },
              { x: new Date(2020, 11), y: 2500000 }
          ]
      },
      {
          type: "splineArea",
          showInLegend: true,
          name: "Entertainment",
          markerSize: 0,
          color: "rgba(194,70,66,.9)",
          dataPoints: [
              { x: new Date(2020, 0), y: 1010000 },
              { x: new Date(2020, 1), y: 600000 },
              { x: new Date(2020, 2), y: 340000 },
              { x: new Date(2020, 3), y: 400000 },
              { x: new Date(2020, 4), y: 900000 },
              { x: new Date(2020, 5), y: 390000 },
              { x: new Date(2020, 6), y: 420000 },
              { x: new Date(2020, 7), y: 500000 },
              { x: new Date(2020, 8), y: 1430000 },
              { x: new Date(2020, 9), y: 1230000 },
              { x: new Date(2020, 10), y: 830000 },
              { x: new Date(2020, 11), y: 630000 }
          ]
      },
      {
          type: "splineArea",
          showInLegend: true,
          name: "Maintenance",
          markerSize: 0,
          color: "rgba(127,96,132,.9)",
          dataPoints: [
              { x: new Date(2020, 0), y: 170000 },
              { x: new Date(2020, 1), y: 260000 },
              { x: new Date(2020, 2), y: 100000 },
              { x: new Date(2020, 3), y: 140000 },
              { x: new Date(2020, 4), y: 90000 },
              { x: new Date(2020, 5), y: 100000 },
              { x: new Date(2020, 6), y: 120000 },
              { x: new Date(2020, 7), y: 500000 },
              { x: new Date(2020, 8), y: 130000 },
              { x: new Date(2020, 9), y: 230000 },
              { x: new Date(2020, 10), y: 280000 },
              { x: new Date(2020, 11), y: 130000 }
          ]
        }]
    }
  }

}
