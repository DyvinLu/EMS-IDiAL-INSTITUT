import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js/auto';
import { RufZaehler } from 'src/app/ludyModel/ruf-zaehler';
import { DataService } from 'src/app/ludyServices/data.service';
// import { NgModel } from '@angular/forms';

import * as moment from 'moment';

declare var $: any; // Deklarieren Sie jQuery, damit TypeScript es verwenden kann
type chartData = {
  label: string;
  backgroundColor: string;
  borderColor: string;
  borderWidth: number;
  data: number[]; // Hier können Sie Ihre eigenen Daten einfügen
};
type schalterType = {
  name: string;
  status: boolean;
  data: chartData;
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  stackedChart: any;
  isChartLoading = false;
  timeRange = 5; // en terme d'heure
  dateEnd: Date = new Date(Date.now());
  readonly MS_PER_MINUTE = 60 * 60 * 1000;
  dateStart: Date = new Date(
    this.dateEnd.getTime() - this.timeRange * this.MS_PER_MINUTE
  );

  dataVisual!: any;
  allData: any[] = [];

  shellys: schalterType[] = [
    {
      name: 'shelly-3em-ohs23-01',
      status: false,
      data: {
        label: '',
        backgroundColor: '',
        borderColor: '',
        borderWidth: 1,
        data: [],
      },
    },
    {
      name: 'shelly-3em-ohs23-02',
      status: false,
      data: {
        label: '',
        backgroundColor: '',
        borderColor: '',
        borderWidth: 1,
        data: [],
      },
    },
    {
      name: 'shelly-3em-ohs23-03',
      status: false,
      data: {
        label: '',
        backgroundColor: '',
        borderColor: '',
        borderWidth: 1,
        data: [],
      },
    },
    {
      name: 'shelly-3em-ohs23-04',
      status: false,
      data: {
        label: '',
        backgroundColor: '',
        borderColor: '',
        borderWidth: 1,
        data: [],
      },
    },
    {
      name: 'shelly-3em-ohs23-05',
      status: false,
      data: {
        label: '',
        backgroundColor: '',
        borderColor: '',
        borderWidth: 1,
        data: [],
      },
    },
  ];

  hauptZaehler: schalterType[] = [
    {
      name: 'ITRON',
      status: false,
      data: {
        label: '',
        backgroundColor: '',
        borderColor: '',
        borderWidth: 1,
        data: [],
      },
    },
    {
      name: 'EBZDD3',
      status: false,
      data: {
        label: '',
        backgroundColor: '',
        borderColor: '',
        borderWidth: 1,
        data: [],
      },
    },
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

  constructor(private dataServ: DataService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
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
        this.updateChart();
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
            // title: {
            //   display: true,
            //   text: '15 min Fenster',
            //   padding: {
            //     top: 10,
            //     bottom: 10,
            //   },
            //   font: {
            //     size: 14,
            //   },
            // },
          },
          y: {
            stacked: true, // Y-Achse gestapelt
            title: {
              display: true,
              text: 'Mittlere Leistung Pro Minuten in Kilowatt',
              padding: {
                top: 10,
                bottom: 10,
              },
              font: {
                size: 14,
              },
            },
          },
        },
      },
    });
    this.isChartLoading = true;
  }

  updateChart() {
    this.stackedChart.data.labels = this.xAbscisse;
    this.stackedChart.data.datasets = this.allData;
    this.stackedChart.update();
  }

  showCheckedShellys() {
    this.allData = [];
    this.hauptZaehler.forEach((item) =>{
      if(item.status) this.allData.push(item.data)
    })
    this.shellys.forEach((item) =>{
      if(item.status) this.allData.push(item.data)
    })
    this.updateChart();

  }

  private timeDifference(start: string, end: string): number {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diff = endDate.getTime() - startDate.getTime();
    const hour = diff / (1000 * 3600);

    return hour;
  }

  private calculateDiffHauptZaehler(
    fromApi: any[],
    hauptZaehlerNamen: string,
    backgroundColorRGBA: string,
    borderColorRGBA: string
  ): chartData {
    const size = fromApi.length - 1;
    const xValues: string[] = [];
    const hauptzaehler: chartData = {
      label: hauptZaehlerNamen,
      backgroundColor: backgroundColorRGBA,
      borderColor: borderColorRGBA,
      borderWidth: 1,
      data: [],
    };
    if (!(fromApi[size - 1] && fromApi[0])) {
      console.log(
        `Für ${hauptZaehlerNamen} haben wir zurzeit keine Daten bekommen`
      );
      return hauptzaehler;
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
    
    hauptzaehler.data = diff;
    this.xAbscisse = xValues;
    this.allData.push(hauptzaehler);
    return hauptzaehler;
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
    const shelly: chartData = {
      label: shellyName,
      backgroundColor: backgroundColorRGBA,
      borderColor: borderColorRGBA,
      borderWidth: 1,
      data: diff,
    };

    this.allData.push(shelly);
    return shelly;
  }

  stackBarChartForAllGraphs(diff: boolean = false) {
    this.allData = [];
    //debugger
    let sendToBAck = new RufZaehler();
    sendToBAck.dateStart = this.dateStart;
    sendToBAck.dateEnd = this.dateEnd;

    for (let i = 0; i < this.shellys.length; i++) {
      sendToBAck.zaehlerName = `"${this.shellys[i].name}"`;
      this.dataServ.DataFromShelly(sendToBAck).subscribe((fromApi: any) => {
        if (!diff)
          this.shellys[i].data = this.getShellyDataForStackChart(
            fromApi,
            this.shellys[i].name,
            this.backgroundColorsShellys[i],
            this.borderColorsShellys[i]
          );
        else
          this.shellys[i].data = this.calculateDiffShelly(
            fromApi,
            this.shellys[i].name,
            this.backgroundColorsShellys[i],
            this.borderColorsShellys[i]
          );
      });
    }

    for (let i = 0; i < this.hauptZaehler.length; i++) {
      sendToBAck.zaehlerName = `"${this.hauptZaehler[i].name}"`;
      this.dataServ
        .DataFromHauptZaehler(sendToBAck)
        .subscribe((fromApi: any) => {
          if (!diff)
            this.hauptZaehler[i].data = this.getHauptzaehlerDataForStackChart(
              fromApi,
              this.hauptZaehler[i].name,
              this.backgroundColorsHauptzaehler[i],
              this.borderColorsHauptzaehler[i]
            );
          else
            this.hauptZaehler[i].data = this.calculateDiffHauptZaehler(
              fromApi,
              this.hauptZaehler[i].name,
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

    const shelly: chartData = {
      label: shellyName,
      backgroundColor: backgroundColorRGBA,
      borderColor: borderColorRGBA,
      borderWidth: 1,
      data: dataPts, // Hier können Sie Ihre eigenen Daten einfügen
    };

    this.allData.push(shelly);

    return shelly;
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

    const hauptzaehler: chartData = {
      label: hauptZaehlerNamen,
      backgroundColor: backgroundColorRGBA,
      borderColor: borderColorRGBA,
      borderWidth: 1,
      data,
    };

    this.xAbscisse = xValues;
    this.allData.push(hauptzaehler);

    return hauptzaehler;
  }
}
