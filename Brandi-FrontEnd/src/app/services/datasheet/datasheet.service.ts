import { Injectable } from '@angular/core';
import { HttpClient, HttpParams  } from '@angular/common/http'
import { Global, ReceivedData } from 'src/app/Global';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

export interface Datasheet{
  object_designation: string,
  CEARC_process: string ,
  CEARC_process_date: Date,
  CEARC_entry_date: Date,
  LCRM_process: string,
  LCRM_process_date: Date,
  LCRM_entry_date: Date,
  coordinator :number,
  coordinator_name: string,
  last_modified_user: number,
  last_modified_user_name: string,
  last_modified_date: Date,
  object_created_date: Date
}

@Injectable({
  providedIn: 'root'
})
export class DatasheetService {
  public static DATA_LIST = "datasheet/list"; //caminho para lista de fichas tecnicas

  constructor(private http : HttpClient, private auth : AuthService) { }

  public getDatasheets(pesquisa : string): Observable<Datasheet[]> {
    return this.http.get(
      Global.HOST_PREFIX + DatasheetService.DATA_LIST,
      {params: new HttpParams().set('search', pesquisa)}
    ).pipe(map((data: ReceivedData) => {
        let fichas: Datasheet[] = [];
        if(!data.error) {
          data.res.datasheets.forEach(element => {
            element.CEARC_process_date=Global.stringToDate(element.CEARC_process_date);
            element.CEARC_entry_date=Global.stringToDate(element.CEARC_entry_date);
            element.LCRM_process_date=Global.stringToDate(element.LCRM_process_date);
            element.LCRM_entry_date=Global.stringToDate(element.LCRM_entry_date);
            element.last_modified_date=Global.stringToDate(element.last_modified_date);
            element.object_created_date=Global.stringToDate(element.object_created_date);
          });
          fichas=data.res.datasheets;
        }else if(data.error === 2) {
          this.auth.forceLogout();
        } 
        return fichas;
      }
    ));    
  }
}
