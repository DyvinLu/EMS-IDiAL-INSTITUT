import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { RufZaehler } from 'src/app/ludyModel/ruf-zaehler';
import { DataService } from 'src/app/ludyServices/data.service';
import * as moment from 'moment';

declare var $:any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  stackedChart: any;
  isChartLoading = false;
  timeRange = 2;
  dateEnd: any = new Date(Date.now());
  MS_PER_MINUTE = 60 * 60 * 1000;
  dateStart = new Date(this.dateEnd.getTime() - (this.timeRange * this.MS_PER_MINUTE));
  dataVisual: any;
  allData: any[] = [];
  shellyNamen = ["shelly-3em-ohs23-01", "shelly-3em-ohs23-02", "shelly-3em-ohs23-03", "shelly-3em-ohs23-04", "shelly-3em-ohs23-05"];
  hauptZaehlerNamen = ["ITRON", "EBZDD3"];
  backgroundColorsShellys = ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)'];
  borderColorsShellys = ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)'];
  backgroundColorsHauptzaehler = ['rgba(255, 0, 0, 0.2)', 'rgba(0, 255, 0, 0.2)'];
  borderColorsHauptzaehler = ['rgba(255, 0, 0, 1)', 'rgba(0, 255, 0, 1)'];
  xAbscisse: any;

  constructor(private dataServ: DataService){}

  ngOnInit(): void {
    moment.locale('de');
    $('input[name="datetimes"]').daterangepicker({
      timePicker: true,
      timePicker24Hour: true,
      startDate: moment().startOf('hour'),
      endDate: moment().startOf('hour').add(1, 'hour'),
      locale: {
        format: 'DD.MM.YYYY HH:mm',
        applyLabel: 'Anwenden',
        cancelLabel: 'Abbrechen',
        fromLabel: 'Von',
        toLabel: 'Bis',
        weekLabel: 'W',
        customRangeLabel: 'Benutzerdefiniert',
        daysOfWeek: moment.weekdaysMin(),
        monthNames: moment.monthsShort()
      }
    });

    $('input[name="datetimes"]').on('apply.daterangepicker', (ev: any, picker: any) => {
      this.dateRangeChanged(picker.startDate, picker.endDate);
    });

    this.stackBarChartForAllGraphs();
  }

  dateRangeChanged(startDate: any, endDate: any): void {
    this.updateChartData(startDate, endDate);
  }

  updateChartData(startDate: any, endDate: any): void {
    this.allData = [];

    for (let i = 0; i < this.shellyNamen.length; i++) {
      const sendToBAck = new RufZaehler();
      sendToBAck.dateStart = startDate;
      sendToBAck.dateEnd = endDate;
      sendToBAck.zaehlerName = this.shellyNamen[i];
      this.dataServ.DataFromShelly(sendToBAck).subscribe((fromApi: any) => {
        this.getShellyDataForStackChart(fromApi, this.shellyNamen[i], this.backgroundColorsShellys[i], this.borderColorsShellys[i]);
        this.stackedChart();
      });
    }
  }

  getShellyDataForStackChart(fromApi: any, shellyName: string, backgroundColorRGBA: string, borderColorRGBA: string) {
    let xValues = [];
    let dataPhase0 = [];
    let dataPhase1 = [];
    let dataPhase2 = [];

    for (var item of fromApi) {
      if (item.phase == "0") {
        dataPhase0.push(item._value);
        xValues.push(new Date(item._time).toLocaleString());
      } else if (item.phase == "1") {
        dataPhase1.push(item._value);
      } else if (item.phase == "2") {
        dataPhase2.push(item._value);
      }
    }

    let dataPts = [];

    for (let i = 0; i < dataPhase0.length; i++) {
      dataPts.push(dataPhase0[i] + dataPhase1[i] + dataPhase2[i]);
    }

    this.xAbscisse = xValues;
    const shelly = {
      label: shellyName,
      backgroundColor: backgroundColorRGBA,
      borderColor: borderColorRGBA,
      borderWidth: 1,
      data: dataPts
    };

    this.allData.push(shelly);
  }

  stackBarChartForAllGraphs(): void {
    this.allData = [];
    let sendToBAck = new RufZaehler();
    sendToBAck.dateStart = this.dateStart;
    sendToBAck.dateEnd = this.dateEnd;

    for (let i = 0; i < this.shellyNamen.length; i++) {
      sendToBAck.zaehlerName = "\"" + this.shellyNamen[i] + "\"";
      this.dataServ.DataFromShelly(sendToBAck).subscribe((fromApi: any) => {
        this.getShellyDataForStackChart(fromApi, this.shellyNamen[i], this.backgroundColorsShellys[i], this.borderColorsShellys[i]);
      });
    }

    for (let i = 0; i < this.hauptZaehlerNamen.length; i++) {
      sendToBAck.zaehlerName = "\"" + this.hauptZaehlerNamen[i] + "\"";
      this.dataServ.DataFromHauptZaehler(sendToBAck).subscribe((fromApi: any) => {
        this.getHauptzaehlerDataForStackChart(fromApi, this.hauptZaehlerNamen[i], this.backgroundColorsHauptzaehler[i], this.borderColorsHauptzaehler[i]);
      });
    }

    setTimeout(() => {
      this.stackedChart = new Chart('stackedBarChart', {
        type: 'bar',
        data: {
          labels: this.xAbscisse,
          datasets: this.allData
        },
        options: {
          scales: {
            x: {
              stacked: true
            },
            y: {
              stacked: true
            }
          }
        }
      });

      this.isChartLoading = true;
    }, 2000);
  }

  getHauptzaehlerDataForStackChart(fromApi: any, hauptZaehlerNamen: string, backgroundColorRGBA: string, borderColorRGBA: string) {
    let dataPhase0 = [];

    for (var item of fromApi) {
      dataPhase0.push(item._value);
    }

    const hauptzaehler = {
      label: hauptZaehlerNamen,
      backgroundColor: backgroundColorRGBA,
      borderColor: borderColorRGBA,
      borderWidth: 1,
      data: dataPhase0
    };

    this.allData.push(hauptzaehler);
  }
}
