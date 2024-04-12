export type ZaehlerOptions = {
    zaehlerName: string;
    dateStart: Date;
    dateEnd: Date;
    timeInterval?: string;
  }
  
/*type DataModelBaseType = {
    result: string;
    table: string;
    _start: string;
    _stop: string;
    _time: string;
    _value: string;
    _field: string;
    _measurement: string;
    device: string;
    host: string;
    phase: string;
    topic: string;
}
  export type ShellyModel = DataModelBaseType & {

      measurement_type: string;
  }

  export type HauptzaehlerModel = DataModelBaseType & {
      GId: string;
}
*/