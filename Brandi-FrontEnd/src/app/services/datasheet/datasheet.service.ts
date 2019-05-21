import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Global, ReceivedData } from "src/app/Global";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";
import { DatePipe } from "@angular/common";

export interface Datasheet {
  id: number;
  object_designation: string;
  CEARC_process: string;
  CEARC_process_date: Date;
  CEARC_entry_date: Date;
  LCRM_process: string;
  LCRM_process_date: Date;
  LCRM_entry_date: Date;
  coordinator: number;
  coordinator_name: string;
  last_modified_user: number;
  last_modified_user_name: string;
  last_modified_date: Date;
  object_created_date: Date;
  super_category: number;
  category: number;
  sub_category: number;
}



export interface DatasheetList {
  id: number;
  object_designation: string;
}


export interface SuperCategories {
  id: number;
  supercategory: string;
}

export interface Categories {
  id: number;
  category: string;
  id_super_category:number;
}

export interface SubCategories {
  id: number;
  subcategory: string;
  id_category:number;
}

@Injectable({
  providedIn: "root"
})
export class DatasheetService {
  public static DATA = "datasheet"; // caminho para lista de fichas tecnicas
  public static DATA_LIST = "datasheet/list"; // caminho para lista de fichas tecnicas
  public static DATA_CREATE = "datasheet/create";
  public static DATA_EDIT = "datasheet/edit";

  
  public static SUPER_CATEGORIES = "datasheet/super_categories/list";
  public static CATEGORIES = "datasheet/categories/list";
  public static SUB_CATEGORIES = "datasheet/sub_categories/list";
  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private datePipe: DatePipe
  ) {}


  public getSuperCategories(pesquisa: string): Observable<SuperCategories[]> {
    return this.http
      .get(Global.HOST_PREFIX + DatasheetService.SUPER_CATEGORIES, {
        params: new HttpParams().set("search", pesquisa)
      })
      .pipe(
        map((data: ReceivedData) => {
          let fichas: SuperCategories[] = [];
          if (!data.error) {
            fichas = data.res.super_categories;
          } else if (data.error === 2) {
            this.auth.forceLogout();
          }
          return fichas;
        })
      );
  }

  public getCategories(id_super_category:number, pesquisa: string): Observable<Categories[]> {
    return this.http
      .get(Global.HOST_PREFIX + DatasheetService.CATEGORIES, {
        params: new HttpParams().set("search", pesquisa).set("super_category", id_super_category+"")
      })
      .pipe(
        map((data: ReceivedData) => {
          let fichas: Categories[] = [];
          if (!data.error) {
            fichas = data.res.categories;
          } else if (data.error === 3) {
            this.auth.forceLogout();
          }
          return fichas;
        })
      );
  }

  
  public getSubCategories(id_category:number, pesquisa: string): Observable<SubCategories[]> {
    return this.http
      .get(Global.HOST_PREFIX + DatasheetService.SUB_CATEGORIES, {
        params: new HttpParams().set("search", pesquisa).set("category", id_category+"")
      })
      .pipe(
        map((data: ReceivedData) => {
          let fichas: SubCategories[] = [];
          if (!data.error) {
            fichas = data.res.sub_categories;
          } else if (data.error === 3) {
            this.auth.forceLogout();
          }
          return fichas;
        })
      );
  }

  public getDatasheets(pesquisa: string): Observable<DatasheetList[]> {
    return this.http
      .get(Global.HOST_PREFIX + DatasheetService.DATA_LIST, {
        params: new HttpParams().set("search", pesquisa)
      })
      .pipe(
        map((data: ReceivedData) => {
          let fichas: DatasheetList[] = [];
          if (!data.error) {
            fichas = data.res.datasheets;
          } else if (data.error === 2) {
            this.auth.forceLogout();
          }
          return fichas;
        })
      );
  }

  public getDatasheet(id: number): Observable<Datasheet> {
    return this.http
      .get(Global.HOST_PREFIX + DatasheetService.DATA + "/" + id)
      .pipe(
        map((data: ReceivedData) => {
          let ficha: Datasheet = null;
          if (!data.error) {
            let element = data.res.datasheet;
              element.CEARC_process_date = Global.stringToDate(
                element.CEARC_process_date
              );
              element.CEARC_entry_date = Global.stringToDate(
                element.CEARC_entry_date
              );
              element.LCRM_process_date = Global.stringToDate(
                element.LCRM_process_date
              );
              element.LCRM_entry_date = Global.stringToDate(
                element.LCRM_entry_date
              );
              element.last_modified_date = Global.stringToDate(
                element.last_modified_date
              );
              element.object_created_date = Global.stringToDate(
                element.object_created_date
              );
            ficha = data.res.datasheet;
          } else if (data.error === 2) {
            this.auth.forceLogout();
          }
          return ficha;
        })
      );
  }
  public submitDatasheets(
    data: Datasheet,
    idPage: number
  ): Observable<ReceivedData> {
    
    let dados: any = {
      designation: data.object_designation,
      cearcproc: data.CEARC_process,
      cearcprocdata: this.datePipe.transform(
        data.CEARC_process_date,
        "yyyy-MM-dd"
      ),
      cearcentrancedata: this.datePipe.transform(
        data.CEARC_entry_date,
        "yyyy-MM-dd"
      ),
      lcrmproc: data.LCRM_process,
      lcrmprocdata: this.datePipe.transform(
        data.LCRM_process_date,
        "yyyy-MM-dd"
      ),
      lcrmentrancedata: this.datePipe.transform(
        data.LCRM_entry_date,
        "yyyy-MM-dd"
      ),
      coordinatorid: data.coordinator,
      super_category:data.super_category,
      category:data.category,
      sub_category:data.sub_category,

    };
    if (data.id > -1) {
      dados.idobject = data.id;
      // this.datePipe.transform(user.birthday,'yyyy-MM-dd')
      return this.http
        .post(Global.HOST_PREFIX + DatasheetService.DATA_EDIT + "/" + data.id + "/page/" + (idPage+1), dados)
        .pipe(
          map((result: ReceivedData) => {
            if (result.error === 2) {
              this.auth.forceLogout();
            }
            return result;
          })
        );
    }else {
      // this.datePipe.transform(user.birthday,'yyyy-MM-dd')
      return this.http
        .post(Global.HOST_PREFIX + DatasheetService.DATA_CREATE, dados)
        .pipe(
          map((result: ReceivedData) => {
            if (result.error === 3) {
              this.auth.forceLogout();
            }
            return result;
          })
        );
    }
  }

  public static createCleanDatasheet(): Datasheet {
    return <Datasheet>{
      id: -1,
      CEARC_entry_date: new Date(),
      CEARC_process: "",
      CEARC_process_date: new Date(),
      LCRM_entry_date: new Date(),
      LCRM_process: "",
      LCRM_process_date: new Date(),
      coordinator: 0,
      coordinator_name: "",
      last_modified_date: new Date(),
      last_modified_user: 0,
      last_modified_user_name: "",
      object_created_date: new Date(),
      object_designation: ""
    };
  }
}
