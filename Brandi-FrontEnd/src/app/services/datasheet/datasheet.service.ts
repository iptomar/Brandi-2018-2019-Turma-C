import { Injectable } from '@angular/core';
import { HttpClient, HttpParams  } from '@angular/common/http'
import { Global, ReceivedData } from 'src/app/Global';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { DatePipe } from '@angular/common';
import { keys } from 'ts-transformer-keys';

export interface Datasheet{
  id : number,
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
  public static DATA_CREATE= "datasheet/createandedit";
  constructor(private http : HttpClient, private auth : AuthService,private datePipe : DatePipe) {

   }

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
  public submitDatasheets(data:Datasheet, idPage : number): Observable<ReceivedData> {
    let dados : any = {
      designation : data.object_designation,
      cearcproc : data.CEARC_process,
      cearcprocdata : this.datePipe.transform(data.CEARC_process_date,'yyyy-MM-dd'),
      cearcentrancedata: this.datePipe.transform(data.CEARC_entry_date,'yyyy-MM-dd'),
      lcrmproc : data.LCRM_process,
      lcrmprocdata: this.datePipe.transform(data.LCRM_process_date,'yyyy-MM-dd'),
      lcrmentrancedata : this.datePipe.transform(data.LCRM_entry_date,'yyyy-MM-dd'),
      coordinatorid: data.coordinator,
      idPage: idPage
    };
    if(data.id>-1) {
      dados.id=data.id;
    }
    console.log(dados);
    //this.datePipe.transform(user.birthday,'yyyy-MM-dd')
    return this.http.post(
      Global.HOST_PREFIX + DatasheetService.DATA_CREATE,
      data
    ).pipe(map((result: ReceivedData) => {
         if(result.error === 3) {
          this.auth.forceLogout();
        } 

        return result;
      }
    ));    
    


  }


  public static createCleanDatasheet() : Datasheet{
    return <Datasheet>{id: -1, CEARC_entry_date: new Date(), CEARC_process: "",CEARC_process_date:new Date(),LCRM_entry_date: new Date(),LCRM_process:"",LCRM_process_date:new Date(),coordinator:0,coordinator_name:"",last_modified_date:new Date(),last_modified_user: 0,last_modified_user_name: "", object_created_date: new Date(),object_designation: ""};
  }
}
