import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';
import { Global, ReceivedData } from 'src/app/Global';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { DatePipe } from '@angular/common';

export interface Worksheet {
  id: number;
  object_id: number;
  worksheet_date:Date;
  procedure_type:string;
  observations:string;
  materials: number;
  amount: number;
  duration: number;
  technician: number;
  technician_name: string;
}

@Injectable({
  providedIn: 'root'
})
export class WorksheetService {
  public static LIST_WORKSHEET = "datasheet/worksheet/list";
  public static CREATE_WORKSHEET = "datasheet/worksheet/create";

  constructor(private http : HttpClient, private auth : AuthService, public datePipe: DatePipe) { }
  public getWorksheets(id_object:number, search: string): Observable<Worksheet[]> {
    return this.http
      .get(Global.HOST_PREFIX + WorksheetService.LIST_WORKSHEET + "/" + id_object ,{
        params: new HttpParams().set("search", search)
      })
      .pipe(
        map((data: ReceivedData) => {
          if(!data.error) {
            let element = data.res.worksheets;
            element.worksheet_date = Global.stringToDate(
              element.worksheet_date
            );
            return <Worksheet[]>data.res.worksheets;
          }else if (data.error === 1) {
            this.auth.forceLogout();
          }
          return [];
        })
      );
  }

  public addWorksheet(
  object_id: number,
  worksheet_date:Date,
  procedure_type:string,
  observations:string,
  materials: number,
  amount: number,
  duration: number,
  technician: number
  ): Observable<ReceivedData> {
    return this.http
      .post(Global.HOST_PREFIX + WorksheetService.CREATE_WORKSHEET,{
        object_id: object_id,
        worksheet_date: this.datePipe.transform(worksheet_date, "yyyy-MM-dd"),
        procedure_type:procedure_type,
        observations:observations,
        materials: materials,
        amount: amount,
        duration: duration,
        technician: technician
      })
      .pipe(
        map((data: ReceivedData) => {
          if (data.error === 3) {
            this.auth.forceLogout();
          }
          return data;
        })
      );
  }
}
