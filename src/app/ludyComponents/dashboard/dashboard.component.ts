import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { RufZaehler } from 'src/app/ludyModel/ruf-zaehler';
import { DataService } from 'src/app/ludyServices/data.service';
import * as moment from 'moment';

declare var $: any; // Deklarieren Sie jQuery, damit TypeScript es verwenden kann

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  stackedChart: any;
  isChartLoading = false;
  timeRange = 2; // en terme d'heure
  dateEnd: Date = new Date(Date.now());
  readonly MS_PER_MINUTE = 60 * 60 * 1000;
  dateStart: Date = new Date(
    this.dateEnd.getTime() - this.timeRange * this.MS_PER_MINUTE
  );

  dataVisual!: any;
  allData: any[] = [];

  readonly shellyNamen = [
    'shelly-3em-ohs23-01', // 0
    'shelly-3em-ohs23-02', // 1
    'shelly-3em-ohs23-03', // 2
    'shelly-3em-ohs23-04', // 3
    'shelly-3em-ohs23-05', // 4
  ];

  readonly hauptZaehlerNamen = [
    'ITRON', // 0
    'EBZDD3', // 1
  ];

  readonly backgroundColorsShellys = [
    'rgba(255, 99, 132, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(255, 206, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(153, 102, 255, 0.2)',
  ];

  readonly borderColorsShellys = [
    'rgba(255, 99, 132, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
  ];

  readonly backgroundColorsHauptzaehler = [
    'rgba(255, 0, 0, 0.2)',
    'rgba(0, 255, 0, 0.2)',
  ];

  private readonly borderColorsHauptzaehler = [
    'rgba(255, 0, 0, 1)',
    'rgba(0, 255, 0, 1)',
  ];

  private xAbscisse: string[] = [];

  constructor(private dataServ: DataService) {}

  ngOnInit(): void {
    // Lokalisieren Sie moment.js auf Deutsch
    this.stackBarChartForAllGraphs();
    setTimeout(() => {
      this.generateChart();
    }, 2000);
    this.generateCalendar();
  }

  private generateCalendar(): void {
    moment.locale('de');
    // Initialisierung des Date Range Picker mit deutschem Datumsformat
    const picker = $('input[name="datetimes"]').daterangepicker({
      timePicker: true,
      timePicker24Hour: true, // Aktivieren Sie das 24-Stunden-Zeitformat
      startDate: moment().startOf('hour'),
      endDate: moment().startOf('hour').add(1, 'hour'), // Beispiel für eine Start- und Endzeit
      locale: {
        format: 'DD.MM.YYYY HH:mm', // Deutsches Datums- und Zeitformat
        applyLabel: 'Anwenden',
        cancelLabel: 'Abbrechen',
        fromLabel: 'Von',
        toLabel: 'Bis',
        weekLabel: 'W',
        customRangeLabel: 'Benutzerdefiniert',
        daysOfWeek: moment.weekdaysMin(), // Verwenden Sie moment.js, um die Abkürzungen der Wochentage auf Deutsch zu erhalten
        monthNames: moment.monthsShort(), // Verwenden Sie moment.js, um die Abkürzungen der Monate auf Deutsch zu erhalten
      },
      maxDate: moment(),
    });

    picker.on('apply.daterangepicker', (ev: any, picker: any) => {
      // Zugriff auf das ausgewählte Startdatum und Enddatum
      this.dateStart = new Date(picker.startDate);
      this.dateEnd = new Date(picker.endDate);

      //update Chart
      this.allData = [];
      console.log('allDAta sollte lerr', this.allData);
      this.stackBarChartForAllGraphs(true);
      setTimeout(() => {
        this.stackedChart.data.labels = this.xAbscisse;
        this.stackedChart.data.datasets = this.allData;
        console.log(this.allData);
        this.stackedChart.update();
      }, 2000);
    });
  }

  private generateChart(): void {
    this.stackedChart = new Chart('stackedBarChart', {
      type: 'bar',
      data: {
        labels: this.xAbscisse,
        datasets: this.allData,
      },
      options: {
        scales: {
          x: {
            stacked: true, // X-Achse gestapelt
          },
          y: {
            stacked: true, // Y-Achse gestapelt
          },
        },
      },
    });
    this.isChartLoading = true;
  }

  handleSelectedDates(start: Date, end: Date) {
    this.dateStart = start;
    this.dateEnd = end;
    this.stackBarChartForAllGraphs();
  }

  showCheckedShellys(event: any) {
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

  private calculateDiffHauptZaehler(
    fromApi: any[],
    hauptZaehlerNamen: string,
    backgroundColorRGBA: string,
    borderColorRGBA: string
  ) {
    const size = fromApi.length - 1;
    const xValues: string[] = [];
    if (!(fromApi[size - 1] && fromApi[0])) {
      console.log(
        `Für ${hauptZaehlerNamen} haben wir zurzeit keine Daten bekommen`
      );
      return;
    }
    const diff: number[] = [];
    for (let i = 0; i < size; i++) {
      const lastEl = fromApi[i + 1];
      const firstEl = fromApi[i];
      const tmp = lastEl._value - firstEl._value;
      const hour = this.timeDifference(firstEl._time, lastEl._time);
      const res = tmp / hour;
      diff.push(res);
      xValues.push(new Date(firstEl._time).toLocaleString());
    }
    console.log('diff H', diff.length);
    const hauptzaehler = {
      label: hauptZaehlerNamen,
      backgroundColor: backgroundColorRGBA,
      borderColor: borderColorRGBA,
      borderWidth: 1,
      data: diff,
    };

    this.xAbscisse = xValues;
    this.allData.push(hauptzaehler);
  }

  private timeDifference(start: string, end: string): number {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diff = endDate.getTime() - startDate.getTime();
    const hour = diff / (1000 * 3600);

    return hour;
  }
  private calculateDiffShelly(
    fromApi: any[],
    shellyName: string,
    backgroundColorRGBA: string,
    borderColorRGBA: string
  ) {
    const diff: number[] = [];
    const { dataPts, time } = this.getShellySumme(fromApi);
    const size = dataPts.length - 1;

    for (let i = 0; i < size; i++) {
      const tmp = dataPts[i + 1] - dataPts[i];
      const hour = this.timeDifference(time[i], time[i + 1]);
      const res = tmp / 1;
      diff.push(res);
    }
    console.log('diff S', diff.length);
    const shelly = {
      label: shellyName,
      backgroundColor: backgroundColorRGBA,
      borderColor: borderColorRGBA,
      borderWidth: 1,
      data: diff,
    };

    this.allData.push(shelly);
  }

  stackBarChartForAllGraphs(diff: boolean = false) {
    this.allData = [];
    //debugger
    let sendToBAck = new RufZaehler();
    sendToBAck.dateStart = this.dateStart;
    sendToBAck.dateEnd = this.dateEnd;

    for (let i = 0; i < this.shellyNamen.length; i++) {
      sendToBAck.zaehlerName = `"${this.shellyNamen[i]}"`;
      this.dataServ.DataFromShelly(sendToBAck).subscribe((fromApi: any) => {
        if (!diff)
          this.getShellyDataForStackChart(
            fromApi,
            this.shellyNamen[i],
            this.backgroundColorsShellys[i],
            this.borderColorsShellys[i]
          );
        else
          this.calculateDiffShelly(
            fromApi,
            this.shellyNamen[i],
            this.backgroundColorsShellys[i],
            this.borderColorsShellys[i]
          );
      });
    }

    for (let i = 0; i < this.hauptZaehlerNamen.length; i++) {
      sendToBAck.zaehlerName = '"' + this.hauptZaehlerNamen[i] + '"';
      this.dataServ
        .DataFromHauptZaehler(sendToBAck)
        .subscribe((fromApi: any) => {
          if (!diff)
            this.getHauptzaehlerDataForStackChart(
              fromApi,
              this.hauptZaehlerNamen[i],
              this.backgroundColorsHauptzaehler[i],
              this.borderColorsHauptzaehler[i]
            );
          else
            this.calculateDiffHauptZaehler(
              fromApi,
              this.hauptZaehlerNamen[i],
              this.backgroundColorsHauptzaehler[i],
              this.borderColorsHauptzaehler[i]
            );
        });
    }
  }

  private getShellySumme(fromApi: any[]) {
    const dataPts: number[] = [];
    const phase0: number[] = [];
    const phase1: number[] = [];
    const phase2: number[] = [];
    const time: string[] = [];

    fromApi.forEach((item) => {
      const value = item._value;
      if (item.phase == '0') {
        phase0.push(value);
        time.push(item._time);
      } else if (item.phase == '1') {
        phase1.push(value);
      } else if (item.phase == '2') {
        phase2.push(value);
      }
    });

    const size = phase0.length;

    for (let i = 0; i < size; i++) {
      const sum = phase0[i] + phase1[i] + phase2[i];
      dataPts.push(sum);
    }
    return { dataPts, time };
  }

  getShellyDataForStackChart(
    fromApi: any[],
    shellyName: string,
    backgroundColorRGBA: string,
    borderColorRGBA: string
  ) {
    const { dataPts } = this.getShellySumme(fromApi);

    const shelly = {
      label: shellyName,
      backgroundColor: backgroundColorRGBA,
      borderColor: borderColorRGBA,
      borderWidth: 1,
      data: dataPts, // Hier können Sie Ihre eigenen Daten einfügen
    };

    this.allData.push(shelly);
    // console.log('allData = ', this.allData);
  }

  getHauptzaehlerDataForStackChart(
    fromApi: any[],
    hauptZaehlerNamen: string,
    backgroundColorRGBA: string,
    borderColorRGBA: string
  ) {
    let data = [];
    const xValues: string[] = [];

    //debugger
    for (var item of fromApi) {
      // parcourir la liste des donnees
      data.push(item._value);
      xValues.push(new Date(item._time).toLocaleString());
    }

    const hauptzaehler = {
      label: hauptZaehlerNamen,
      backgroundColor: backgroundColorRGBA,
      borderColor: borderColorRGBA,
      borderWidth: 1,
      data,
    };

    this.xAbscisse = xValues;
    this.allData.push(hauptzaehler);
    // console.log('allData = ', this.allData);
  }
}
