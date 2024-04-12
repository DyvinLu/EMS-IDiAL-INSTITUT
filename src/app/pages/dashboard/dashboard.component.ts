import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js/auto';
import { DataService } from 'src/app/services/data.service';
import * as moment from 'moment';
import { map } from 'rxjs';
import { ZaehlerOptions } from 'src/app/app.type';

declare var $: any; // jQuery Deklarieren für TypeScript
type ChartData = {
  label: string;
  backgroundColor: string;
  borderColor: string;
  borderWidth: number;
  data: number[];
};
type ZaehlerType = {
  chartData: ChartData;
  status: boolean;
  dataFromDB?: any[];
};
type ZaehlerTable = {
  name: string;
  akt_min: number;
  akt_max: number;
  hist_min: number;
  hist_max: number;
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  private stackedChart: any;
  protected dataVisual!: ZaehlerTable[];
  private dateEnd: Date;
  private dateStart: Date;

  private allData: ChartData[] = [];
  private xAbscisse: string[] = [];
  protected isChartLoading: boolean = false;
  protected isAverage: boolean = false;

  protected readonly shellys: ZaehlerType[] = [
    {
      status: false,
      chartData: {
        label: 'shelly-3em-ohs23-01',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        data: [],
      },
    },
    {
      status: false,
      chartData: {
        label: 'shelly-3em-ohs23-02',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
        data: [],
      },
    },
    {
      status: false,
      chartData: {
        label: 'shelly-3em-ohs23-03',
        backgroundColor: 'rgba(255, 206, 86, 0.2)',
        borderColor: 'rgba(255, 206, 86, 1)',
        borderWidth: 1,
        data: [],
      },
    },
    {
      status: false,
      chartData: {
        label: 'shelly-3em-ohs23-04',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        data: [],
      },
    },
    {
      status: false,
      chartData: {
        label: 'shelly-3em-ohs23-05',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
        data: [],
      },
    },
  ];

  protected readonly hauptZaehler: ZaehlerType[] = [
    {
      status: false,
      chartData: {
        label: 'EBZDD3',
        backgroundColor: 'rgba(0, 255, 0, 0.2)',
        borderColor: 'rgba(0, 255, 0, 1)',
        borderWidth: 1,
        data: [],
      },
    },
    {
      status: false,
      chartData: {
        label: 'ITRON',
        backgroundColor: 'rgba(255, 0, 0, 0.2)',
        borderColor: 'rgba(255, 0, 0, 1)',
        borderWidth: 1,
        data: [],
      },
    },
  ];

  constructor(private dataService: DataService) {
    Chart.register(...registerables);
    this.dateEnd = new Date(moment().valueOf());
    this.dateStart = new Date(moment().startOf('day').valueOf());
  }

  ngOnInit(): void {
    this.generateCalendar();
    this.loadDataFromDatabaseAndCalculate();
    setTimeout(() => {
      this.generateChart();
      console.log(this.allData)
    }, 2000);
  }

  protected showCheckedShellys() {
    this.clearData();
    this.hauptZaehler.forEach((item) => {
      if (item.status) {
        this.allData.push(item.chartData);
        this.dataVisual.push({
          name: item.chartData.label,
          akt_max: 0,
          akt_min: 0,
          hist_max: 0,
          hist_min: 0,
        });
      }
    });
    this.shellys.forEach((item) => {
      if (item.status) {
        this.allData.push(item.chartData);
        this.dataVisual.push({
          name: item.chartData.label,
          akt_max: 0,
          akt_min: 0,
          hist_max: 0,
          hist_min: 0,
        });
      }
    });
    this.updateChart();
    this.dataVisual.sort();
  }

  protected changeCalculationMode() {
    this.loadDataFromDatabaseAndCalculate();
    this.uncheckAllZaehler();
    this.updateChart();
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

  private updateChart() {
    setTimeout(() => {
      this.stackedChart.data.labels = this.xAbscisse;
      this.stackedChart.data.datasets = this.allData;
      this.stackedChart.update();
    }, 2000);
  }

  private generateCalendar(): void {
    moment.locale('de');
    // Initialisierung des Date Range Picker mit deutschem Datumsformat
    const picker = $('input[name="datetimes"]').daterangepicker({
      timePicker: true,
      timePicker24Hour: true,
      timePickerIncrement: 5,
      startDate: moment().startOf('day'),
      endDate: moment(),
      locale: {
        format: 'DD.MM.YYYY HH:mm', // Deutsches Datums- und Zeitformat
        applyLabel: 'Anwenden',
        cancelLabel: 'Abbrechen',
        fromLabel: 'Von',
        toLabel: 'Bis',
        weekLabel: 'W',
        customRangeLabel: 'Benutzerdefiniert',
        daysOfWeek: moment.weekdaysMin(), //Abkürzungen der Wochentage auf Deutsch
        monthNames: moment.monthsShort(), //Abkürzungen der Monate auf Deutsch
      },
      maxDate: moment(),
    });

    picker.on('apply.daterangepicker', (ev: any, picker: any) => {
      this.dateStart = new Date(picker.startDate);
      this.dateEnd = new Date(picker.endDate);

      this.clearData();
      this.loadDataFromDatabaseAndCalculate();
      this.uncheckAllZaehler();
      this.updateChart();
    });
  }

  private loadDataFromDatabaseAndCalculate(): void {
    this.clearData();
    const options: ZaehlerOptions = {
      dateEnd: this.dateEnd,
      dateStart: this.dateStart,
      zaehlerName: '',
    };

    for (let i = 0; i < this.shellys.length; i++) {
      options.zaehlerName = `"${this.shellys[i].chartData.label}"`;
      this.dataService
        .DataFromShelly(options)
        .pipe(
          map((dataFromDB) =>
            dataFromDB.map((item) => {
              return {
                _value: item._value / 1000 / 0.25,
                _time: item._time,
                phase: item.phase
              };
            })
          )
        )
        .subscribe((dataFromDB: any[]) => {
          if (dataFromDB.length !== 0)
            if (this.isAverage)
              this.averageCalculationForShellys(dataFromDB, i);
            else this.standardCalculationForShellys(dataFromDB, i);
        });
    }

    for (let i = 0; i < this.hauptZaehler.length; i++) {
      options.zaehlerName = `"${this.hauptZaehler[i].chartData.label}"`;
      this.dataService
        .DataFromHauptZaehler(options)
        .pipe(
          map((dataFromDB) =>
            dataFromDB.map((item) => {
              return {
                _value: item._value / 0.25,
                _time: item._time,
              };
            })
          )
        )
        .subscribe((dataFromDB) => {
          if (dataFromDB.length !== 0)
            if (this.isAverage)
              this.averageCalculationForHauptZaehler(dataFromDB, i);
            else this.standardCalculationForHauptZaehler(dataFromDB, i);
        });
    }
  }

  private standardCalculationForHauptZaehler(dataFromDB: any[], index: number) {
    console.log(dataFromDB)
    const data = [];
    const xValues: string[] = [];

    for (const item of dataFromDB) {
      data.push(item._value);
      xValues.push(new Date(item._time).toLocaleString());
    }

    this.hauptZaehler[index].chartData.data = data;

    this.xAbscisse = xValues;
    this.allData.push(this.hauptZaehler[index].chartData);
  }

  private standardCalculationForShellys(dataFromDB: any[], index: number) {
    const { dataPts } = this.getShellySumme(dataFromDB);
    console.log(dataPts)
    this.shellys[index].chartData.data = dataPts;
    this.allData.push(this.shellys[index].chartData);
  }

  private averageCalculationForHauptZaehler(
    dataFromDB: any[],
    index: number
  ): void {
    const size = dataFromDB.length - 1;
    const xValues: string[] = [];
    const chartData = this.hauptZaehler[index].chartData;
    chartData.data = [];

    const dataDiff: number[] = [];
    for (let i = 0; i < size; i++) {
      const lastEl = dataFromDB[i + 1];
      const firstEl = dataFromDB[i];
      const tmp = lastEl._value - firstEl._value;
      const hour = this.timeDifference(firstEl._time, lastEl._time);
      const res = tmp / hour;
      dataDiff.push(res);
      xValues.push(new Date(firstEl._time).toLocaleString());
    }

    chartData.data = dataDiff;
    this.xAbscisse = xValues;
    this.allData.push(chartData);
    this.hauptZaehler[index].chartData = chartData;
  }

  private averageCalculationForShellys(dataFromDB: any[], index: number) {
    const Datadiff: number[] = [];
    const { dataPts, time } = this.getShellySumme(dataFromDB);
    const size = dataPts.length - 1;

    for (let i = 0; i < size; i++) {
      const tmp = dataPts[i + 1] - dataPts[i];
      const hour = this.timeDifference(time[i], time[i + 1]);
      const res = tmp / hour;
      Datadiff.push(res);
    }
    this.shellys[index].chartData.data = Datadiff;

    this.allData.push(this.shellys[index].chartData);
  }

  private getShellySumme(dataFromDB: any[]) {
    const dataPts: number[] = [];
    const phase0: number[] = [];
    const phase1: number[] = [];
    const phase2: number[] = [];
    const time: string[] = [];

    dataFromDB.forEach((item) => {
      const value = item._value;
      if (item.phase === '0') {
        phase0.push(value);
        time.push(item._time);
      } else if (item.phase === '1') {
        phase1.push(value);
      } else if (item.phase === '2') {
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

  private uncheckAllZaehler() {
    this.shellys.forEach((item) => (item.status = false));
    this.hauptZaehler.forEach((item) => (item.status = false));
  }

  private clearData() {
    this.allData = [];
    this.dataVisual = [];
  }

  private timeDifference(start: string, end: string): number {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diff = endDate.getTime() - startDate.getTime();
    const hour = diff / (1000 * 3600);

    return hour;
  }
}
