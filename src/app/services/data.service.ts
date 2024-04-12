import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ZaehlerOptions } from '../app.type';
import { InfluxDB, QueryApi } from '@influxdata/influxdb-client';

@Injectable({
  providedIn: 'root',
})

//Class Definition:Defines the DataService class
export class DataService {

  private readonly url = 'http://sems.vms.idial.fh:8086';
  private readonly token = 'sems_token';
  private readonly org = 'idial';
  private readonly standardInterval = '4h';
  private readonly queryInfluxDB: QueryApi;

  
  constructor(private http: HttpClient) {
    this.queryInfluxDB = new InfluxDB({ url: this.url, token: this.token }).getQueryApi(this.org);
  }

  private getQueryForHauptzaehler(name: string, start: string, end: string, interval: string){
    return `from(bucket:"sems") |> range(start: ${start}, stop: ${end}) |> filter(fn: (r) => r["_measurement"] == "mqtt_consumer") |> filter(fn: (r) => r["GId"] == ${name})  |> filter(fn: (r) => r["_field"] == "total") |> aggregateWindow(every: ${interval}, fn: last, createEmpty: false) |> yield(name: "last")`;
  };
  private getQueryForShelly(name: string, start: string, end: string, interval: string) {
    return `from(bucket:"sems") |> range(start: ${start}, stop: ${end}) |> filter(fn: (r) => r._measurement == "mqtt_consumer") |> filter(fn: (r) => r.device == ${name})  |> filter(fn: (r) => r["measurement_type"] == "total")|> filter(fn: (r) => r["phase"] == "0" or r["phase"] == "1" or r["phase"] == "2") |> aggregateWindow(every: ${interval}, fn: last, createEmpty: false) |> yield(name: "last")`;
  };
  private async queryDatabase(query: string) {
    const data = [];
    try {
      for await (const { values, tableMeta } of this.queryInfluxDB.iterateRows(query)) {
        const o = tableMeta.toObject(values);
        data.push(o);
      }
      return data;
    } catch (error) {
      console.error('Fehler beim Abrufen der Daten:', error);
      throw error;
    }
  };

  // const rufHauptzaehler = expressAsyncHandler(async (req, res) => {
  //   try {
  //     const { zaehlerName, dateStart, dateEnd, timeInterval } = req.body;
  //     const start = new Date(dateStart).toISOString();
  //     const end = new Date(dateEnd).toISOString(); // ceci peut etre ll'instant T ou' on se trouve
  //     const interval = timeInterval || standardInterval; // Standardmäßig 15 Minuten, kann angepasst werden
  
  //     /** To avoid SQL injection, use a string literal for the query. */
  //     const query = getQueryForHauptzaehler(zaehlerName, start, end, interval);
  //     const data = await queryDatabase(query);
  
  //     return res.status(200).json(data);
  //   } catch (err) {
  //     return res.status(501).json('something went wront: ERROR = ' + err);
  //   }
  // });
  
  // const rufShelly = expressAsyncHandler(async (req, res) => {
  //   try {
  //     //console.log("req",req.body)
  
  //     const { zaehlerName, dateStart, dateEnd, timeInterval } = req.body;
  //     const start = new Date(dateStart).toISOString();
  //     const end = new Date(dateEnd).toISOString();
  //     const interval = timeInterval || standardInterval; // Standardmäßig 15 Minuten, kann angepasst werden
  
  //     /** To avoid SQL injection, use a string literal for the query. */
  //     const query = getQueryForShelly(zaehlerName, start, end, interval);
  //     const data = await queryDatabase(query);
  
  //     return res.status(200).json(data);
  //   } catch (err) {
  //     return res.status(501).json('something went wront: ERROR = ' + err);
  //   }
  // });
  
  // private async getAllDataLive() {
  //   try {
  //     const MS_PER_MINUTE = 60000;
  //     const data = [];
  //     const end = new Date(Date.now()).toISOString();
  //     const start = new Date(moment().startOf('day').valueOf()).toISOString();
  
  //     const interval = standardInterval; // Standardmäßig 15 Minuten, kann angepasst werden
  
  //     for (const name of hauptzaehlerNamen) {
  //       const tmp = await queryDatabase(
  //         getQueryForHauptzaehler(name, start, end, interval)
  //       );
  //       data.push(tmp);
  //     }
  
  //     for (const name of shellyNamen) {
  //       const tmp = await queryDatabase(
  //         getQueryForShelly(name, start, end, interval)
  //       );
  //       data.push(tmp);
  //     }
  //     return res.status(200).json(data);
  //   } catch (err) {
  //     console.error(err);
  //     return res.status(501).json('something went wront: ERROR = ' + err);
  //   }
  // });

  getAllZaehlerFromDB() {
    return this.http.get<any[][]>('http://localhost:5000/api/data/compteurs/live'); // cette ligne permet d'appeler le backend
  }

  getShellyFromDB(ruf: ZaehlerOptions) {
    return this.http.post<any[]>('http://localhost:5000/api/data/shelly', ruf); // cette ligne permet d'appeler le backend
  }

  getHauptZaehlerFromDB(ruf: ZaehlerOptions) {
    return this.http.post<any[]>( 'http://localhost:5000/api/data/hauptzaehler', ruf); // cette ligne permet d'appeler le backend
  }

}
