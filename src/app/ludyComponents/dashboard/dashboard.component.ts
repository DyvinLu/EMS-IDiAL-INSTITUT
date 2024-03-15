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
export class DashboardComponent implements OnInit{

  stackedChart: any;

  isChartLoading = false;

  timeRange = 5; // temps par defaut
  areaChart: any = [];
  dataVisual!: any;

  Hauptzähler1 = "EBZDD3";
  Hauptzähler2 = "ITRON";
 

  multiAreaChart = {
    animationEnabled: true,
    exportEnabled: true,
    title: {
        text: ""
    },
    axisY: {
        prefix: ""
    },
    toolTip: {
        shared: true,
        content: "{name}: {y} kwh"
    },
    legend: {
        fontSize: 13
    },
  };

  allData: any[] = [];

  sumHauptzaehler1: any = 0;
  sumHauptzaehler2: any = 0;
  yValues7: number[] = [];

  zaehlerNamen = [
    "shelly-3em-ohs23-01", // 0
    "shelly-3em-ohs23-02", // 1
    "shelly-3em-ohs23-03", // 2
    "shelly-3em-ohs23-04", // 3
    "shelly-3em-ohs23-05", // 0
  ]

  hauptzaehlerNamen = [
    "EBZDD3", // 0
    "ITRON", // 1
  ]
 
  

  constructor(private dataServ: DataService){
    this.getAreaChartForAllGraphs(this.timeRange);
  }



  ngOnInit() {
    // Konfigurieren und Rendern des gestapelten Balkendiagramms
    this.stackedChart = new Chart('stackedBarChart', {
      type: 'bar',
      data: {
        labels: ['Label 1', 'Label 2', 'Label 3', 'Label 4', 'Label 5'], // Hier können Sie Ihre eigenen Labels einfügen
        datasets: [
          {
            label: 'Dataset 1',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
            data: [10, 20, 30, 40, 50] // Hier können Sie Ihre eigenen Daten einfügen
          },
          {
            label: 'Dataset 2',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
            data: [20, 30, 40, 50, 60] // Hier können Sie Ihre eigenen Daten einfügen
          },
          {
            label: 'Dataset 3',
            backgroundColor: 'rgba(255, 206, 86, 0.2)',
            borderColor: 'rgba(255, 206, 86, 1)',
            borderWidth: 1,
            data: [10, 20, 30, 40, 50] // Hier können Sie Ihre eigenen Daten einfügen
          },
          {
            label: 'Dataset 4',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            data: [30, 40, 50, 60, 70] // Hier können Sie Ihre eigenen Daten einfügen
          },
          {
            label: 'Dataset 5',
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1,
            data: [40, 50, 60, 70, 80] // Hier können Sie Ihre eigenen Daten einfügen
          }
        ]
      },
      options: {
        scales: {
          x: {
            stacked: true // X-Achse gestapelt
          },
          y: {
            stacked: true // Y-Achse gestapelt
          }
        }
      }
    });
  }



  showCheckedShellys(event: any){

    console.log("-----------------------begin-------------------");
    console.log("event = ", event.target.defaultValue);
    console.log("isChecked: ", event.target.checked);
    console.log("event: ",event);
    
    
    
    // reinitialier allData

    switch(event.target.defaultValue){
      case "shelly-3em-ohs23-01":
        // TODO: appel shelly1
        if(event.target.checked == true){
          const isAny = this.allData.filter(item => item.name === event.target.defaultValue);
          
          if(isAny.length == 0){
            let sendToBAck1 = new RufZaehler();
            sendToBAck1.timeRange = this.timeRange,
            sendToBAck1.zaehlerName = "\"" + this.zaehlerNamen[0] + "\"";
            this.dataServ.DataFromShelly(sendToBAck1).subscribe((fromApi:any)=>{
    
              this.getShellyData(fromApi, this.zaehlerNamen[0], "rgba(26, 26, 255, 1)", "splineArea");
            });
          }

        }else{
          // enlever le shelly s'il n'est pas cocher
          this.allData = this.allData.filter(item => item.name !== event.target.defaultValue);
          
        }
        
        break;
      case "shelly-3em-ohs23-02":
        if(event.target.checked == true){
          const isAny = this.allData.filter(item => item.name === event.target.defaultValue);

          if(isAny.length == 0){
            let sendToBAck2 = new RufZaehler();
            sendToBAck2.timeRange = this.timeRange,
            sendToBAck2.zaehlerName = "\"" + this.zaehlerNamen[1] + "\"";
            this.dataServ.DataFromShelly(sendToBAck2).subscribe((fromApi:any)=>{
    
              this.getShellyData(fromApi, this.zaehlerNamen[1], "rgba(230, 0, 172, 0.4)", "splineArea");
    
            });
          }
          
        }else{
          // enlever le shelly s'il n'est pas cocher
          this.allData = this.allData.filter(item => item.name !== event.target.defaultValue);
        }
        
        break;
      case "shelly-3em-ohs23-03":
        if(event.target.checked == true){
          const isAny = this.allData.filter(item => item.name === event.target.defaultValue);
        
        if(isAny.length == 0){
          let sendToBAck3 = new RufZaehler();
          sendToBAck3.timeRange = this.timeRange,
          sendToBAck3.zaehlerName = "\"" + this.zaehlerNamen[2] + "\"";
          this.dataServ.DataFromShelly(sendToBAck3).subscribe((fromApi:any)=>{
  
            this.getShellyData(fromApi, this.zaehlerNamen[2], "rgba(0, 204, 204, 0.5)", "splineArea");
  
          });
        }
      }else{
        // enlever le shelly s'il n'est pas cocher
        this.allData = this.allData.filter(item => item.name !== event.target.defaultValue);
      }
        
        break;
      case "shelly-3em-ohs23-04":
        if(event.target.checked == true){
          const isAny = this.allData.filter(item => item.name === event.target.defaultValue);

        if(isAny.length == 0){
          let sendToBAck4 = new RufZaehler();
          sendToBAck4.timeRange = this.timeRange,
          sendToBAck4.zaehlerName = "\"" + this.zaehlerNamen[3] + "\"";
          this.dataServ.DataFromShelly(sendToBAck4).subscribe((fromApi:any)=>{
  
            this.getShellyData(fromApi, this.zaehlerNamen[3], "rgba(255, 26, 117, 0.5)", "splineArea");
  
          });
        }
      }else{
        // enlever le shelly s'il n'est pas cocher
        this.allData = this.allData.filter(item => item.name !== event.target.defaultValue);
      }
        
        break;
      case "shelly-3em-ohs23-05":

      if(event.target.checked == true){
        const isAny = this.allData.filter(item => item.name === event.target.defaultValue);

        if(isAny.length == 0){
          let sendToBAck5 = new RufZaehler();
          sendToBAck5.timeRange = this.timeRange,
          sendToBAck5.zaehlerName = "\"" + this.zaehlerNamen[4] + "\"";
          this.dataServ.DataFromShelly(sendToBAck5).subscribe((fromApi:any)=>{
  
            this.getShellyData(fromApi, this.zaehlerNamen[4], "rgb(455, 26, 117, 0.6)", "splineArea");
  
  
          });  
        }
      }else{
        // enlever le shelly s'il n'est pas cocher
        this.allData = this.allData.filter(item => item.name !== event.target.defaultValue);
      }

        break;
    }

    
    const tmp = {data: this.allData}
    this.multiAreaChart = {...this.multiAreaChart, ...tmp};
    this.isChartLoading = true;

    console.log("-----------------------end-------------------");
    
  }


  getAreaChartForAllGraphs(timeInHour: number){

    // for Hauptzaehler1
    // let sendToBAck6 = new RufZaehler();
    // sendToBAck6.timeRange = timeInHour,
    // sendToBAck6.zaehlerName = "\"" + this.hauptzaehlerNamen[0] + "\""
    // this.dataServ.DataFromHauptZaehler(sendToBAck6).subscribe((fromApi:any)=>{
        
    //   this.getShellyData(fromApi, this.hauptzaehlerNamen[0], "rgba(39, 27, 500, 0.05)", "splineArea");
        
    // });  
    
    // for Hauptzaeheler2
    // let sendToBAck7 = new RufZaehler();
    // sendToBAck7.timeRange = timeInHour,
    // sendToBAck7.zaehlerName = "\"" + this.hauptzaehlerNamen[1] + "\""
    // this.dataServ.DataFromHauptZaehler(sendToBAck7).subscribe((fromApi:any)=>{
            
    //   this.getShellyData(fromApi, this.hauptzaehlerNamen[1], "rgba(45, 28, 300, 0.05)", "splineArea");
            
    // });

    // for shelly01
    let sendToBAck1 = new RufZaehler();
    sendToBAck1.timeRange = timeInHour,
    sendToBAck1.zaehlerName = "\"" + this.zaehlerNamen[0] + "\""
    this.dataServ.DataFromShelly(sendToBAck1).subscribe((fromApi:any)=>{

      this.getShellyData(fromApi, this.zaehlerNamen[0], "rgba(102, 0, 204, 0.5)", "splineArea");

    });
      
    // for shelly 02
    let sendToBAck2 = new RufZaehler();
    sendToBAck2.timeRange = timeInHour,
    sendToBAck2.zaehlerName = "\"" + this.zaehlerNamen[1] + "\"";
    this.dataServ.DataFromShelly(sendToBAck2).subscribe((fromApi:any)=>{

      this.getShellyData(fromApi, this.zaehlerNamen[1], "rgba(255, 26, 26, 0.9)", "splineArea");

    });

    // for shelly 03
    let sendToBAck3 = new RufZaehler();
    sendToBAck3.timeRange = timeInHour,
    sendToBAck3.zaehlerName = "\"" + this.zaehlerNamen[2] + "\"";
    this.dataServ.DataFromShelly(sendToBAck3).subscribe((fromApi:any)=>{

      this.getShellyData(fromApi, this.zaehlerNamen[2], "rgba(0, 204, 204, 0.5)", "splineArea");

    });

    // for shelly 4
    let sendToBAck4 = new RufZaehler();
    sendToBAck4.timeRange = timeInHour,
    sendToBAck4.zaehlerName = "\"" + this.zaehlerNamen[3] + "\"";
    this.dataServ.DataFromShelly(sendToBAck4).subscribe((fromApi:any)=>{

      this.getShellyData(fromApi, this.zaehlerNamen[3], "rgba(0, 153, 51, 0.9)", "splineArea");

    });

    // for shelly 05
    let sendToBAck5 = new RufZaehler();
    sendToBAck5.timeRange = timeInHour,
    sendToBAck5.zaehlerName = "\"" + this.zaehlerNamen[4] + "\"";
    this.dataServ.DataFromShelly(sendToBAck5).subscribe((fromApi:any)=>{

      this.getShellyData(fromApi, this.zaehlerNamen[4], "rgba(255, 179, 203, 0.6)", "splineArea");

    });

    // compilation finale
    const tmp = {data: this.allData}

    this.multiAreaChart = {...this.multiAreaChart, ...tmp};

    console.log("multiAreaChart", this.multiAreaChart);
    

    this.isChartLoading = true;

    console.log("is it TrueOrFalse? = ",this.isChartLoading);
    

  }


  getShellyData(fromApi: any, shellyName: string, colorRGBA: string, typeName: string) {
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
  }


}
