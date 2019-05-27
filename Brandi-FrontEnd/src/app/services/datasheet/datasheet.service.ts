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
  last_modified_user: number;
  last_modified_date: Date;
  object_created_date: Date;
  super_category: number;
  category: number;
  sub_category: number;
  dimensions: string;
  other_dimensions: string;
  tipology: string;
  site: string;
  object_owner: number;
  owner: number;
  patron: number;
  object_is_a_set: number;
  set_type: string;
  set_elements: string;
  set_materials: string;
  set_inscriptions: string;
  set_mount: string;
  set_build: string;
  classification: string;
  period: number;
  quality: number;
  style: number;
  small_description: string;
  analogies: string;
  conclusions: string;
  author: string;
  dating: string;
  origin: string;
  materials_structure: string;
  materials_surface: string;
  materials_elementsAccessories: string;
  techniques_structure: string;
  techniques_surface: string;
  techniques_elementsAccessories: string;
  site_description: string;
  cold_temp: string;
  hot_temp: string;
  cold_humidity: string;
  hot_humidity: string;
  cold_start: number;
  cold_end: number;
  hot_start: number;
  hot_end: number;
  lightning_type_natural: string;
  lightning_origin_artificial: string;
  artificial_lux: string;
  natural_lux: string;
  artificial_uv: string;
  natural_uv: string;
  artificial_real_uv: string;
  natural_real_uv: string;
  poluting_agents: string;
  poluting_sources: string;
  poluting_results: string;
  env_conclusions: string;
}



export interface DatasheetList {
  id: number;
  object_designation: string;
}

@Injectable({
  providedIn: "root"
})
export class DatasheetService {
  public static DATA = "datasheet"; // caminho para lista de fichas tecnicas
  public static DATA_LIST = "datasheet/list"; // caminho para lista de fichas tecnicas
  public static DATA_CREATE = "datasheet/create";
  public static DATA_EDIT = "datasheet/edit";

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private datePipe: DatePipe
  ) {}

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
          let ficha:Datasheet= null;
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
    data: any,
    idPage: number
  ): Observable<ReceivedData> {
    let dados: any;
    switch(idPage){
      case(0):
        dados=  {
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
        break;
        case(1):
        dados=  {
          dimensions: data.dimensions,
          other_dimensions : data.other_dimensions,
          tipology : data.tipology,
          site :data.site,
          object_owner : data.object_owner,
          owner: data.owner,
          patron :data.patron
        };
        break;
        case(2):
        dados=  {
          object_is_a_set : data.object_is_a_set,
          set_type: data.set_type,
          elements: data.elements,
          set_materials: data.set_materials,
          set_inscriptions: data.set_inscriptions,
          set_mount: data.set_mount,
          set_build: data.set_build,
          classification: data.classification,
          period: data.period,
          quality: data.quality,
          style: data.style,
          materials_structure: data.materials_structure,
          materials_surface: data.materials_surface,
          materials_elementsAccessories: data.materials_elementsAccessories,
          techniques_structure: data.techniques_structure,
          techniques_surface: data.techniques_surface,
          techniques_elementsAccessories: data.techniques_elementsAccessories,
          small_description: data.small_description,
          analogies: data.analogies,
          conclusions: data.conclusions,
          author: data.author,
          dating: data.dating,
          origin: data.origin
        };
        break;
        case(3):
        dados=  {
          site_description: data.site_description,
          cold_temp: data.cold_temp,
          hot_temp: data.hot_temp,
          cold_humidity: data.cold_humidity,
          hot_humidity: data.hot_humidity, 
          cold_start: data.cold_start,
          cold_end: data.cold_end,
          hot_start: data.hot_start,
          hot_end: data.hot_end,
          lightning_type_natural: data.lightning_type_natural,
          lightning_origin_artificial: data.lightning_origin_artificial,
          artificial_lux: data.artificial_lux,
          natural_lux: data.natural_lux,
          artificial_uv: data.artificial_uv,
          natural_uv: data.natural_uv,
          natural_real_uv: data.natural_real_uv,
          artificial_real_uv: data.artificial_real_uv,
          poluting_agents: data.poluting_agents,
          poluting_sources: data.poluting_sources,
          poluting_results: data.poluting_results,
          env_conclusions: data.env_conclusions
        };
        break;

        
        default:
        dados=  {};
        
        break;

    }
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
}
