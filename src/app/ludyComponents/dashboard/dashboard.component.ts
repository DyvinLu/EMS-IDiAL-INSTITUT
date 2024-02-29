//Import Statements:Imports necessary Angular modules and services

import { Component, Input, OnInit } from '@angular/core';
//import Chart from 'chart.js/auto'
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

  stackedChart!:any;
 
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
    //this.getAreaChartGraph(this.timeRange);
  }



  ngOnInit() {
   
  }

  showCheckedShellys(event: any){

    console.log("-----------------------begin-------------------");
    console.log("event = ", event.target.defaultValue);
    console.log("isChecked: ", event.target.checked);
    
    
    // reinitialier allData

    switch(event.target.defaultValue){
      case "shelly-3em-ohs23-01":
        // TODO: appel shelly1
        if(event.target.checked == true){
          const isAny = this.allData.filter(item => item.name === event.target.defaultValue);
          
          if(isAny.length == 0){
            let sendToBAck1 = new RufZaehler();
            sendToBAck1.timeRange = this.timeRange,
            sendToBAck1.zaehlerName = this.zaehlerNamen[0]
            this.dataServ.DataFromShelly3emOhs2301(sendToBAck1).subscribe((fromApi:any)=>{
    
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
            sendToBAck2.zaehlerName = this.zaehlerNamen[1];
            this.dataServ.DataFromShelly3emOhs2302(sendToBAck2).subscribe((fromApi:any)=>{
    
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
          sendToBAck3.zaehlerName = this.zaehlerNamen[2];
          this.dataServ.DataFromShelly3emOhs2303(sendToBAck3).subscribe((fromApi:any)=>{
  
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
          sendToBAck4.zaehlerName = this.zaehlerNamen[3];
          this.dataServ.DataFromShelly3emOhs2304(sendToBAck4).subscribe((fromApi:any)=>{
  
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
          sendToBAck5.zaehlerName = this.zaehlerNamen[4];
          this.dataServ.DataFromShelly3emOhs2305(sendToBAck5).subscribe((fromApi:any)=>{
  
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


  getAreaChartGraph(timeInHour: number){

    /////////////// for shelly01
    let sendToBAck1 = new RufZaehler();
    sendToBAck1.timeRange = timeInHour,
    sendToBAck1.zaehlerName = this.zaehlerNamen[0]
    this.dataServ.DataFromShelly3emOhs2301(sendToBAck1).subscribe((fromApi:any)=>{

      this.getShellyData(fromApi, this.zaehlerNamen[0], "rgba(26, 26, 255, 0.05)", "splineArea");

    });
    
    ////////////// for shelly02
  
    let sendToBAck2 = new RufZaehler();
    sendToBAck2.timeRange = timeInHour,
    sendToBAck2.zaehlerName = this.zaehlerNamen[1];
    this.dataServ.DataFromShelly3emOhs2302(sendToBAck2).subscribe((fromApi:any)=>{

      this.getShellyData(fromApi, this.zaehlerNamen[1], "rgba(230, 0, 172, 0.4)", "splineArea");

    });

    let sendToBAck3 = new RufZaehler();
    sendToBAck3.timeRange = timeInHour,
    sendToBAck3.zaehlerName = this.zaehlerNamen[2];
    this.dataServ.DataFromShelly3emOhs2303(sendToBAck3).subscribe((fromApi:any)=>{

      this.getShellyData(fromApi, this.zaehlerNamen[2], "rgba(0, 204, 204, 0.5)", "splineArea");

    });

    let sendToBAck4 = new RufZaehler();
    sendToBAck4.timeRange = timeInHour,
    sendToBAck4.zaehlerName = this.zaehlerNamen[3];
    this.dataServ.DataFromShelly3emOhs2304(sendToBAck4).subscribe((fromApi:any)=>{

      this.getShellyData(fromApi, this.zaehlerNamen[3], "rgba(255, 26, 117, 0.5)", "splineArea");

    });

    let sendToBAck5 = new RufZaehler();
    sendToBAck5.timeRange = timeInHour,
    sendToBAck5.zaehlerName = this.zaehlerNamen[4];
    this.dataServ.DataFromShelly3emOhs2305(sendToBAck5).subscribe((fromApi:any)=>{

      this.getShellyData(fromApi, this.zaehlerNamen[4], "rgba(255, 179, 203, 0.6)", "splineArea");

    });


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
