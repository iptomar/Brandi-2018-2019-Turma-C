import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';
import { Global, ReceivedData } from 'src/app/Global';
import { map } from 'rxjs/operators';
import { DatePipe } from '@angular/common';

export interface Tests{
  type_reference:string;
  location:string;
  objectives:string;
  technician:number;
  technician_name:string;
  analysis_DATE: Date;
  results:string;
}

@Injectable({
  providedIn: 'root'
})
export class TestsService {
  public static LIST_TESTS = "datasheet/tests/list";
  public static CREATE_TEST = "datasheet/tests/create";

  constructor(private http : HttpClient, private auth : AuthService, public datePipe: DatePipe) { }

  public getTests(id_object:number, search: string): Observable<Tests[]> {
    return this.http
      .get(Global.HOST_PREFIX + TestsService.LIST_TESTS + "/" + id_object ,{
        params: new HttpParams().set("search", search)
      })
      .pipe(
        map((data: ReceivedData) => {
          if(!data.error) {
            let element = data.res.tests;
            element.analysis_DATE = Global.stringToDate(
              element.analysis_DATE
            );
            return <Tests[]>data.res.tests;
          }else if (data.error === 1) {
            this.auth.forceLogout();
          }
          return [];
        })
      );
  }

  public addTest(object_id: number, type_reference: string, location: string, objectives: string, technician: number, results:string): Observable<ReceivedData> {
    return this.http
      .post(Global.HOST_PREFIX + TestsService.CREATE_TEST,{
        object_id:object_id,
        type_reference: type_reference,
        location: location,
        objectives: objectives,
        technician: technician,
        results
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
