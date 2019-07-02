import { Injectable } from '@angular/core';
import { Global, ReceivedData } from 'src/app/Global';
import { HttpParams, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DatePipe } from '@angular/common';

export interface Solubility{
  id:number;
  object_id:number;
  description:string;
  features:string;
  technician:number;
  solub_date:Date;
  technician_name:string;
}

export interface Solvent {
  id:number;
  tbl_solubilityid:number;
  solvent:string;
  efficiency:number;
  observations:string;
}

@Injectable({
  providedIn: 'root'
})
export class TestsSolubilityService {

  public static LIST_SOLUBILITY = "datasheet/solubility/list";
  public static CREATE_SOLUBILITY = "datasheet/solubility/create";

  public static LIST_SOLVENT = "datasheet/solvent/list";
  public static CREATE_SOLVENT = "datasheet/solvent/create";

  constructor(private http : HttpClient, private auth : AuthService, public datePipe: DatePipe) { }

  public getSolubilities(id_object:number, search: string): Observable<Solubility[]> {
    return this.http
      .get(Global.HOST_PREFIX + TestsSolubilityService.LIST_SOLUBILITY + "/" + id_object ,{
        params: new HttpParams().set("search", search)
      })
      .pipe(
        map((data: ReceivedData) => {
          if(!data.error) {
            data.res.solubilities.forEach(element => {
              element.solub_date = Global.stringToDate(
                element.solub_date
              );
            });
            return <Solubility[]>data.res.solubilities;
          }else if (data.error === 1) {
            this.auth.forceLogout();
          }
          return [];
        })
      );
  }

  public addSolubility(
    object_id:number,
    description:string,
    features:string,
    technician:number,
    solub_date:Date
    ): Observable<ReceivedData> {
      return this.http
        .post(Global.HOST_PREFIX + TestsSolubilityService.CREATE_SOLUBILITY,{
          object_id: object_id,
          solub_date: this.datePipe.transform(solub_date, "yyyy-MM-dd"),
          description:description,
          features:features,
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

    public getSolvents(id_solubility:number, search: string): Observable<Solvent[]> {
      return this.http
        .get(Global.HOST_PREFIX + TestsSolubilityService.LIST_SOLVENT + "/" + id_solubility ,{
          params: new HttpParams().set("search", search)
        })
        .pipe(
          map((data: ReceivedData) => {
            if(!data.error) {
              return <Solvent[]>data.res.solvents;
            }else if (data.error === 1) {
              this.auth.forceLogout();
            }
            return [];
          })
        );
    }

    
    public addSolvent(
      tbl_solubilityid:number,
      solvent:string,
      efficiency:number,
      observations:string
      ): Observable<ReceivedData> {
        return this.http
          .post(Global.HOST_PREFIX + TestsSolubilityService.CREATE_SOLVENT,{
            tbl_solubilityid: tbl_solubilityid,
            solvent: solvent,
            efficiency:efficiency,
            observations:observations
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
