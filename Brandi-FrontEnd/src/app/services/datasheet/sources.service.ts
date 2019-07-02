import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Global, ReceivedData } from 'src/app/Global';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { map } from 'rxjs/operators';


export interface Source {
  id: number,
  object_id: number,
  source_type_set: number,
  source:string,
  source_type:string,
  source_site:string,
  source_quota:string,
  source_date:Date
}

@Injectable({
  providedIn: 'root'
})
export class SourcesService {
  public static LIST_SOURCES = "datasheet/sources/list";
  public static DELETE_SOURCES = "datasheet/sources/delete";
  public static CREATE_SOURCES = "datasheet/sources/create";
  public static CHANGE_SOURCES = "datasheet/sources/change";

  constructor(private http : HttpClient, private auth : AuthService) { }

  public getSources(id_object:number, search: string): Observable<Source[]> {
    return this.http
      .get(Global.HOST_PREFIX + SourcesService.LIST_SOURCES + "/" + id_object ,{
        params: new HttpParams().set("search", search)
      })
      .pipe(
        map((data: ReceivedData) => {
          if(!data.error) {
            return <Source[]>data.res.sources;
          }else if (data.error === 1) {
            this.auth.forceLogout();
          }
          return [];
        })
      );
  }

  public deleteSource(idSource : number): Observable<ReceivedData> {
    return this.http
      .post(Global.HOST_PREFIX + SourcesService.DELETE_SOURCES + "/" + idSource ,{})
      .pipe(
        map((data: ReceivedData) => {
          if (data.error === 2) {
            this.auth.forceLogout();
          }
          return data;
        })
      );
  }

  public createSource(
    object_id: number,
    source_type_set: number,
    source:string,
    source_type:string,
    source_site:string,
    source_quota:string,
    source_date:Date): Observable<ReceivedData> {
    return this.http
      .post(Global.HOST_PREFIX + SourcesService.CREATE_SOURCES ,{
        object_id:object_id,
        source_type_set: source_type_set,
        source:source,
        source_type:source_type,
        source_site:source_site,
        source_quota:source_quota,
        source_date:source_date
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

  public editSource(
    id: number,
    source_type_set: number,
    source:string,
    source_type:string,
    source_site:string,
    source_quota:string,
    source_date:Date): Observable<ReceivedData> {
    return this.http
      .post(Global.HOST_PREFIX + SourcesService.CHANGE_SOURCES + "/" + id ,{
        source_type_set: source_type_set,
        source:source,
        source_type:source_type,
        source_site:source_site,
        source_quota:source_quota,
        source_date:source_date
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
