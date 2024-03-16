import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto'
import { RufZaehler } from 'src/app/ludyModel/ruf-zaehler';
import { DataService } from 'src/app/ludyServices/data.service';

//declare var $:any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
  
})
export class DashboardComponent implements OnInit{

  stackedChart: any;
  isChartLoading = false;
  timeRange = 5; // temps par defaut
  dataVisual!: any;
  allData: any[] = [];
  shellyNamen = [
    "shelly-3em-ohs23-01", // 0
    "shelly-3em-ohs23-02", // 1
    "shelly-3em-ohs23-03", // 2
    "shelly-3em-ohs23-04", // 3
    "shelly-3em-ohs23-05", // 0
  ]

  hauptZaehlerNamen = [
    "EBZDD3", // 0
    "ITRON", // 1
  ]

  backgroundColorsShellys = [
    'rgba(255, 99, 132, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(255, 206, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(153, 102, 255, 0.2)',
  ]

  borderColorsShellys = [
    'rgba(255, 99, 132, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)'
  ]

  backgroundColorsHauptzaehler =[
    'rgba(255, 99, 132, 0.2)',
    'rgba(255, 99, 132, 0.2)',
  ]

  borderColorsHauptzaehler =[
    'rgba(255, 159, 64, 1)',
    'rgba(100, 200, 159, 1)',
  ]
 
  

  constructor(private dataServ: DataService){}

   ngOnInit() {
    this.stackBarChartForAllGraphs(this.timeRange);

    console.log("datasets = ",this.allData);
  } 

  showCheckedShellys(event: any){

    /*console.log("-----------------------begin-------------------");
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
            sendToBAck1.zaehlerName = "\"" + this.shellyNamen[0] + "\"";
            this.dataServ.DataFromShelly(sendToBAck1).subscribe((fromApi:any)=>{
    
              this.getShellyData(fromApi, this.shellyNamen[0], "rgba(26, 26, 255, 1)", "splineArea");
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
            sendToBAck2.zaehlerName = "\"" + this.shellyNamen[1] + "\"";
            this.dataServ.DataFromShelly(sendToBAck2).subscribe((fromApi:any)=>{
    
              this.getShellyData(fromApi, this.shellyNamen[1], "rgba(230, 0, 172, 0.4)", "splineArea");
    
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
          sendToBAck3.zaehlerName = "\"" + this.shellyNamen[2] + "\"";
          this.dataServ.DataFromShelly(sendToBAck3).subscribe((fromApi:any)=>{
  
            this.getShellyData(fromApi, this.shellyNamen[2], "rgba(0, 204, 204, 0.5)", "splineArea");
  
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
          sendToBAck4.zaehlerName = "\"" + this.shellyNamen[3] + "\"";
          this.dataServ.DataFromShelly(sendToBAck4).subscribe((fromApi:any)=>{
  
            this.getShellyData(fromApi, this.shellyNamen[3], "rgba(255, 26, 117, 0.5)", "splineArea");
  
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
          sendToBAck5.zaehlerName = "\"" + this.shellyNamen[4] + "\"";
          this.dataServ.DataFromShelly(sendToBAck5).subscribe((fromApi:any)=>{
  
            this.getShellyData(fromApi, this.shellyNamen[4], "rgb(455, 26, 117, 0.6)", "splineArea");
  
  
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

    console.log("-----------------------end-------------------");*/
    
  }


    stackBarChartForAllGraphs(timeInHour: number){

    let sendToBAck = new RufZaehler();
    sendToBAck.timeRange = timeInHour;

    for(let i = 0; i < this.shellyNamen.length; i++){
      sendToBAck.zaehlerName = "\"" + this.shellyNamen[i] + "\""
      this.dataServ.DataFromShelly(sendToBAck).subscribe((fromApi:any)=>{
        
        this.getShellyDataForStackChart(fromApi, this.shellyNamen[i], this.backgroundColorsShellys[i], this.borderColorsShellys[i]);
        
      });
    }
    

    for(let i = 0; i < this.hauptZaehlerNamen.length; i++){
      sendToBAck.zaehlerName = "\"" + this.hauptZaehlerNamen[i] + "\""
      this.dataServ.DataFromHauptZaehler(sendToBAck).subscribe((fromApi:any)=>{
        
        this.getShellyDataForStackChart(fromApi, this.hauptZaehlerNamen[i], this.backgroundColorsHauptzaehler[i], this.borderColorsHauptzaehler[i]);
        
      });
    }

    this.stackedChart = new Chart('stackedBarChart', {
      type: 'bar',
      data: {
        labels: ['Label 1', 'Label 2', 'Label 3', 'Label 4', 'Label 5'], // Hier können Sie Ihre eigenen Labels einfügen
        datasets: this.allData
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

    console.log("stackBarChart", this.stackedChart);
    
    this.isChartLoading = true;

    console.log("is it TrueOrFalse? = ",this.isChartLoading);
    
  }

    getShellyDataForStackChart(fromApi: any, shellyName: string, backgroundColorRGBA: string, borderColorRGBA: string) {
    let xValues = [];
    let dataPhase0 = [];
    let dataPhase1 = [];
    let dataPhase2 = []; 

    //debugger
    for(var item of fromApi){ // parcourir la liste des donnees
     
      xValues.push( new Date(item._time));
      if(item.phase == "0"){
        dataPhase0.push(item._value);
      }else if(item.phase == "1"){
        dataPhase1.push(item._value);
      }else if(item.phase == "2"){
        dataPhase2.push(item._value);
      }
    }

    let dataPts = [];

    for(let i = 0; i < dataPhase0.length; i++){
      dataPts.push((dataPhase0[i] + dataPhase1[i] + dataPhase2[i]) / 3);
    }

    const shelly = {
      label: shellyName,
      backgroundColor: backgroundColorRGBA,
      borderColor: borderColorRGBA,
      borderWidth: 1,
      data: dataPts // Hier können Sie Ihre eigenen Daten einfügen
    }
  
    this.allData.push(shelly);
  }


}
