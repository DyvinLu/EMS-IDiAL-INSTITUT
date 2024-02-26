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

  Hauptzähler1 = "xx6";
  Hauptzähler2 = "xx7";
 

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
        content: "{name}: ${y}"
    },
    legend: {
        fontSize: 13
    },
  };

  allData: any[] = [];

  stackedChart!:any;
 
  sumHauptzähler1: any = 0;
  sumHauptzähler2: any = 0;
  yValues7: number[] = [];

  zaehlerNamen = [
    "shelly-3em-ohs23-01", // 0
    "shelly-3em-ohs23-02", // 1
    "shelly-3em-ohs23-03", // 2
    "shelly-3em-ohs23-04", // 3
    "shelly-3em-ohs23-05", // 0
  ]

  hauptzaehlerNamen = [
    "XX-06", // 0
    "XX-07", // 1
  ]
 
  

  constructor(private dataServ: DataService){
    this.getAreaChartGraph(this.timeRange);
  }



  ngOnInit() {
   
  }

  showShellys(event: any){
    console.log("event = ", event.target.defaultValue);

    // reinitialier allData
    this.allData = [];

    switch(event.target.defaultValue){
      case "shelly-3em-ohs23-01":
        // TODO: appel shelly1
        let sendToBAck1 = new RufZaehler();
        sendToBAck1.timeRange = this.timeRange,
        sendToBAck1.zaehlerName = this.zaehlerNamen[0]
        this.dataServ.DataFromShelly3emOhs2301(sendToBAck1).subscribe((fromApi:any)=>{

          this.getShellyData(fromApi, this.zaehlerNamen[0], "rgba(26, 26, 255, 1)", "splineArea");

          const tmp = {data: this.allData}
          this.multiAreaChart = {...this.multiAreaChart, ...tmp};
          this.isChartLoading = true;

        });
    
        break;
      case "shelly-3em-ohs23-02":
        let sendToBAck2 = new RufZaehler();
        sendToBAck2.timeRange = this.timeRange,
        sendToBAck2.zaehlerName = this.zaehlerNamen[1];
        this.dataServ.DataFromShelly3emOhs2302(sendToBAck2).subscribe((fromApi:any)=>{

          this.getShellyData(fromApi, this.zaehlerNamen[1], "rgba(230, 0, 172, 0.4)", "splineArea");

          const tmp = {data: this.allData}
          this.multiAreaChart = {...this.multiAreaChart, ...tmp};
          this.isChartLoading = true;

        });
        break;
      case "shelly-3em-ohs23-03":
        let sendToBAck3 = new RufZaehler();
        sendToBAck3.timeRange = this.timeRange,
        sendToBAck3.zaehlerName = this.zaehlerNamen[2];
        this.dataServ.DataFromShelly3emOhs2303(sendToBAck3).subscribe((fromApi:any)=>{

          this.getShellyData(fromApi, this.zaehlerNamen[2], "rgba(0, 204, 204, 0.5)", "splineArea");
          const tmp = {data: this.allData}
          this.multiAreaChart = {...this.multiAreaChart, ...tmp};
          this.isChartLoading = true;


        });
        break;
      case "shelly-3em-ohs23-04":
        let sendToBAck4 = new RufZaehler();
        sendToBAck4.timeRange = this.timeRange,
        sendToBAck4.zaehlerName = this.zaehlerNamen[3];
        this.dataServ.DataFromShelly3emOhs2304(sendToBAck4).subscribe((fromApi:any)=>{

          this.getShellyData(fromApi, this.zaehlerNamen[3], "rgba(255, 26, 117, 0.5)", "splineArea");

          const tmp = {data: this.allData}
          this.multiAreaChart = {...this.multiAreaChart, ...tmp};
          this.isChartLoading = true;

        });
        break;
      case "shelly-3em-ohs23-05":
        let sendToBAck5 = new RufZaehler();
        sendToBAck5.timeRange = this.timeRange,
        sendToBAck5.zaehlerName = this.zaehlerNamen[4];
        this.dataServ.DataFromShelly3emOhs2305(sendToBAck5).subscribe((fromApi:any)=>{

          this.getShellyData(fromApi, this.zaehlerNamen[4], "rgba(255, 179, 203, 0.6)", "splineArea");

          const tmp = {data: this.allData}
          this.multiAreaChart = {...this.multiAreaChart, ...tmp};
          this.isChartLoading = true;

        });

        break;
    }
    
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

    let sendToBAck6 = new RufZaehler();
    sendToBAck6.timeRange = timeInHour,
    sendToBAck6.zaehlerName = this.hauptzaehlerNamen[0];
    this.dataServ.DataFromXX06(sendToBAck6).subscribe((fromApi:any)=>{

      this.getShellyData(fromApi, this.hauptzaehlerNamen[0], "rgba(229, 255, 255, 0.8)", "splineArea");

    });

    let sendToBAck7 = new RufZaehler();
    sendToBAck7.timeRange = timeInHour,
    sendToBAck7.zaehlerName = this.hauptzaehlerNamen[1];
    this.dataServ.DataFromXX07(sendToBAck7).subscribe((fromApi:any)=>{

      this.getShellyData(fromApi, this.hauptzaehlerNamen[1], "rgba(255, 255, 229, 0.9)", "splineArea");

    });


    const tmp = {data: this.allData}

    this.multiAreaChart = {...this.multiAreaChart, ...tmp};

    console.log("multiAreaChart", this.multiAreaChart);
    

    this.isChartLoading = true;

    console.log("is it TrueOrFalse? = ",this.isChartLoading);
    

  }


  getShellyData(fromApi: any, shellyName: string, colorRGBA: string, typeName: string){
    let dataPts = [];
    for(var item of fromApi){ // parcourir la liste des donnees
      const xyValue = {
        x: new Date(item._time),
        y: item._value,
      };

      dataPts.push(xyValue);
    }
  
    dataPts.sort((b:any, a:any) => b.x.getTime() - a.x.getTime());

    const shelly = {
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
