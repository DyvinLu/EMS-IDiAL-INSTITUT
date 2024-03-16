//Import Statements:Imports necessary Angular modules and services

import { Component, OnInit } from '@angular/core';
//import { Chart } from 'chart.js';
import Chart from 'chart.js/auto'
import { RufZaehler } from 'src/app/ludyModel/ruf-zaehler';
import { DataService } from 'src/app/ludyServices/data.service';


declare var $:any;

/* Component Decoration: Decorates the class as an Angular 
component with a specific selector, template, and styles. */

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
  
})

//Defines the DashboardComponent class, implementing the OnInit interface

export class DashboardComponent implements OnInit {
  stackedChart: any;
  isChartLoading = false;
  timeRange = 5;
  allData: any[] = [];
  dataVisual!: any;

  shellyNamen = [
    "shelly-3em-ohs23-01",
    "shelly-3em-ohs23-02",
    "shelly-3em-ohs23-03",
    "shelly-3em-ohs23-04",
    "shelly-3em-ohs23-05"
  ];

  hauptZaehlerNamen = [
    "EBZDD3",
    "ITRON_"
  ];

  constructor(private dataServ: DataService) {}

  ngOnInit() {
    this.getBarChartForAllGraphs(this.timeRange);
    this.initializeStackedBarChart();
  }

  initializeStackedBarChart() {
    this.stackedChart = new Chart('stackedBarChart', {
      type: 'bar',
      data: {
        labels: [], // Placeholder for labels
        datasets: [] // Placeholder for datasets
      },
      options: {
        scales: {
          x: { stacked: true },
          y: { stacked: true }
        }
      }
    });
  }

  showCheckedShellys(event: any) {
    console.log("-----------------------begin-------------------");
    console.log("event = ", event.target.defaultValue);
    console.log("isChecked: ", event.target.checked);
    console.log("event: ", event);

    const shellyName = event.target.defaultValue;
    const isChecked = event.target.checked;

    if (isChecked) {
      const isAny = this.allData.some(item => item.name === shellyName);
      if (!isAny) {
        let sendToBack = new RufZaehler();
        sendToBack.timeRange = this.timeRange;
        sendToBack.zaehlerName = "\"" + shellyName + "\"";
        this.dataServ.DataFromShelly(sendToBack).subscribe((fromApi: any) => {
          this.getShellyData(fromApi, shellyName, this.getUniqueColor(), "bar");
        });
      }
    } else {
      this.allData = this.allData.filter(item => item.name !== shellyName);
    }

    this.updateStackedBarChart();
  }

  updateStackedBarChart() {
    const labels = this.allData.reduce((acc: any[], curr: any) => {
      const dataPoints = curr.dataPoints.map((dp: any) => dp.x);
      return [...acc, ...dataPoints];
    }, []);

    const uniqueLabels = [...new Set(labels)]; // Deduplicate labels

    const datasets = this.shellyNamen.map((shellyName, index) => {
      const dataPoints = uniqueLabels.map(label => {
        const dataPoint = this.allData.find(data => data.name === shellyName)?.dataPoints.find((dp: any) => dp.x === label);
        return dataPoint ? dataPoint.y : 0;
      });

      return {
        label: shellyName,
        backgroundColor: this.getColor(index),
        data: dataPoints
      };
    });

    this.stackedChart.data.labels = uniqueLabels;
    this.stackedChart.data.datasets = datasets;
    this.stackedChart.update();
  }

  getBarChartForAllGraphs(timeInHour: number) {

    this.hauptZaehlerNamen.forEach(hauptZaehlerName => {
      let sendToBack = new RufZaehler();
      sendToBack.timeRange = timeInHour;
      sendToBack.zaehlerName = "\"" + hauptZaehlerName + "\""; // "\"" + this.hauptZaehlerNamen[0] + "\""
  let response = this.dataServ.DataFromHauptZaehler(sendToBack).subscribe((fromApi: any) => {
        this.getShellyData(fromApi, hauptZaehlerName, this.getUniqueColor(), "bar");
        this.updateStackedBarChart();
      });
    });


    this.shellyNamen.forEach(shellyName => {
      let sendToBack = new RufZaehler();
      sendToBack.timeRange = timeInHour;
      sendToBack.zaehlerName = "\"" + shellyName + "\"";
      this.dataServ.DataFromShelly(sendToBack).subscribe((fromApi: any) => {
        this.getShellyData(fromApi, shellyName, this.getUniqueColor(), "bar");
        this.updateStackedBarChart();
      });
    });
  }

  getUniqueColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  }

  getShellyData(data: any, name: string, color: string, chartType: string) {
    const newData = {
      name: name,
      dataPoints: data.map((d: any) => {
        return { x: d.time, y: d.value };
      }),
      color: color,
      chartType: chartType
    };
    this.allData.push(newData);
  }

  getColor(index: number) {
    const colors = [
      '#FF5733',
      '#33FF57',
      '#5733FF',
      '#33FFDD',
      '#FF33DD'
    ];

    return colors[index % colors.length];
  }



  getAreaChartForAllGraphs(timeInHour: number){

    //for Hauptzaehler1
    let sendToBAck6 = new RufZaehler();
    sendToBAck6.timeRange = timeInHour,
    sendToBAck6.zaehlerName = "\"" + this.hauptZaehlerNamen[0] + "\""
    this.dataServ.DataFromHauptZaehler(sendToBAck6).subscribe((fromApi:any)=>{
       
      this.getShellyData(fromApi, this.hauptZaehlerNamen[0], "rgba(39, 27, 500, 0.05)", "splineArea");
       
    });  
   
    //for Hauptzaeheler2
    let sendToBAck7 = new RufZaehler();
    sendToBAck7.timeRange = timeInHour,
    sendToBAck7.zaehlerName = "\"" + this.hauptZaehlerNamen[1] + "\""
    this.dataServ.DataFromHauptZaehler(sendToBAck7).subscribe((fromApi:any)=>{
           
      this.getShellyData(fromApi, this.hauptZaehlerNamen[1], "rgba(45, 28, 300, 0.05)", "splineArea");
           
    });
  
    //for shelly01
   let sendToBAck1 = new RufZaehler();
   sendToBAck1.timeRange = timeInHour,
   sendToBAck1.zaehlerName = "\"" + this.shellyNamen[0] + "\""
   this.dataServ.DataFromShelly(sendToBAck1).subscribe((fromApi:any)=>{
  
     this.getShellyData(fromApi, this.shellyNamen[0], "rgba(102, 0, 204, 0.5)", "splineArea");
  
   });
     
   // for shelly 02
   let sendToBAck2 = new RufZaehler();
   sendToBAck2.timeRange = timeInHour,
   sendToBAck2.zaehlerName = "\"" + this.shellyNamen[1] + "\"";
   this.dataServ.DataFromShelly(sendToBAck2).subscribe((fromApi:any)=>{
  
     this.getShellyData(fromApi, this.shellyNamen[1], "rgba(255, 26, 26, 0.9)", "splineArea");
  
   });
  
   // for shelly 03
   let sendToBAck3 = new RufZaehler();
   sendToBAck3.timeRange = timeInHour,
   sendToBAck3.zaehlerName = "\"" + this.shellyNamen[2] + "\"";
   this.dataServ.DataFromShelly(sendToBAck3).subscribe((fromApi:any)=>{
  
     this.getShellyData(fromApi, this.shellyNamen[2], "rgba(0, 204, 204, 0.5)", "splineArea");
  
   });
  
   // for shelly 4
   let sendToBAck4 = new RufZaehler();
   sendToBAck4.timeRange = timeInHour,
   sendToBAck4.zaehlerName = "\"" + this.shellyNamen[3] + "\"";
   this.dataServ.DataFromShelly(sendToBAck4).subscribe((fromApi:any)=>{
  
     this.getShellyData(fromApi, this.shellyNamen[3], "rgba(0, 153, 51, 0.9)", "splineArea");
  
   });
  
   // for shelly 05
   let sendToBAck5 = new RufZaehler();
   sendToBAck5.timeRange = timeInHour,
   sendToBAck5.zaehlerName = "\"" + this.shellyNamen[4] + "\"";
   this.dataServ.DataFromShelly(sendToBAck5).subscribe((fromApi:any)=>{
  
     this.getShellyData(fromApi, this.shellyNamen[4], "rgba(255, 179, 203, 0.6)", "splineArea");
  
   });
  
   // compilation finale
   const tmp = {data: this.allData}
  
   this.multiAreaChart = {...this.multiAreaChart, ...tmp};
  
   console.log("multiAreaChart", this.multiAreaChart);
   
  
   this.isChartLoading = true;
  
   console.log("is it TrueOrFalse? = ",this.isChartLoading);
   
  
  }


 /*  getShellyData(fromApi: any, shellyName: string, colorRGBA: string, typeName: string) {
    let dataPhase0 = [];
    let dataPhase1 = [];
    let dataPhase2 = []; 
  
    for(var item of fromApi){ // parcourir la liste des donnees
      const xyValue = {
        x: new Date(item._time),
        y: item._value,
      };
  
      if(item.phase == "0"){
        dataPhase0.push(xyValue);
      }else if(item.phase == "1"){
        dataPhase1.push(xyValue);
      }else if(item.phase == "2"){
        dataPhase2.push(xyValue);
      }
    }
  
    dataPhase0.sort((b:any, a:any) => b.x.getTime() - a.x.getTime());
    dataPhase1.sort((b:any, a:any) => b.x.getTime() - a.x.getTime());
    dataPhase2.sort((b:any, a:any) => b.x.getTime() - a.x.getTime());
  
    let dataPts = [];
  
    for(let i = 0; i < dataPhase0.length; i++){
      const xyValue = {
        x: dataPhase0[i].x,
        y: (dataPhase0[i].y + dataPhase1[i].y + dataPhase2[i].y) / 3
      };
  
      dataPts.push(xyValue);
    }
  
    const shelly =  {
      type: typeName,
      showInLegend: true,
      name: shellyName,
      markerSize: 0,
      color: colorRGBA,
      dataPoints: dataPts
    };
  
    this.allData.push(shelly);
  } */
}











