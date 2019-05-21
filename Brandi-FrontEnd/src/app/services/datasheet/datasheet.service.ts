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
  /*
   dimensions:string;
   other_dimensions:string;
   typology: string;
   location: string;
   owner: any; //mudar para tipo de dados certo 
   restore_owner: any; //mudar para tipo de dados certo 
   pay_guy: any; //mudar para tipo de dados certo 
   group_item: boolean;
   group_description: string;
   group_parts:string;
   materials: string;
   author_brand: string;
   assembly_brand: string;
   construct_brand: string;
   pat_classification: string;
   style: string;
   time_period: string;
   quality: string;
   material_struct: string;
   material_superficie: string;
   material_accessory: string;
   technique_struct: string;
   technique_superficie: string;
   technique_accessory: string;
   brief_descript: string;
   analogies: string;
   conclusions: string;
   authorship: string;
   datation: string; //???
   origin_place: string;
   place_description: string;
   anual_fc_temp: number;
   anual_fc_humidity: number;
   anual_fc_per_in: number;
   anual_fc_per_end: number;
   anual_qs_temp: number;
   anual_qs_humidity: number;
   anual_qs_per_in: number;
   anual_qs_per_end: number;
   rad_type_nat:string;
   rad_ilum_nat: number;
   rad_UV_nat_med:number;
   rad_UV_nat_real:number;
   rad_type_art:string;
   rad_ilum_art: number;
   rad_UV_nat_art:number;
   rad_UV_nat_art:number;
   polution_agent: string;
   polution_origin: string;
   polution_result: string;
   observation2: string;
   i_m_t_t_p: boolean;
   i_i_e_o: boolean;
   c_e_conserv: boolean;
   i_p_a_b:boolean;
   d_o_e_i_t_s_a: boolean;
   e_p_m_e_i: boolean;
   tab_interpret_results: string;
   tab_conclusions: string;
   det_fis_quim_mec_struct: string;
   det_fis_quim_mec_superficie: string;
   det_fis_quim_mec_accessory: string;
   det_bio_struct: string;
   det_bio_superficie: string;
   det_bio_accessory: string;
   det_bio_conclusion: string;
   //fim da tab estado
   int_anteriores_struct: string;
   int_anteriores_superficie: string;
   int_anteriores_accessory: string;
   int_anteriores_conclusion: string;
   prop_owner_int_preserv: boolean;
   prop_owner_int_conserv: boolean;
   prop_owner_int_restore: boolean;
   prop_owner_int_specifics: string;
   prop_interv_preserv: boolean;
   prop_interv_conserv: boolean;
   prop_interv_restore: boolean;
   prop_met_interv_struct: string;
   prop_met_interv_resources_struct: string;
   prop_met_interv_superficie: string;
   prop_met_interv_resources_superficie: string;
   prop_met_interv_accessories: string;
   prop_met_interv_resources_accessories: string;
   prop_met_conclusions: string;
   prop_met_interloc_ipt: any; //substituir por tipo de dados correto
   prop_met_interloc_client: any; //substituir por tipo de dados correto
   prop_met_date_prop: Date; //nao esquecer de tratar com a funcao do Global para datas
   prop_met_date_accepted: Date; //nao esquecer de tratar com a funcao do Global para datas
   interv_struct: string;
   interv_superficie: string;
   interv_accessories: string;
   interv_struct_resoures: string;
   interv_superficie_resoures: string;
   interv_accessories_resoures: string;
   interv_concusions: string;
   sources: any; //check if right type
   */
}

@Injectable({
  providedIn: "root"
})
export class DatasheetService {
  public static DATA_LIST = "datasheet/list"; // caminho para lista de fichas tecnicas
  public static DATA_CREATE = "datasheet/createandedit";
  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private datePipe: DatePipe
  ) {}

  public getDatasheets(pesquisa: string): Observable<Datasheet[]> {
    return this.http
      .get(Global.HOST_PREFIX + DatasheetService.DATA_LIST, {
        params: new HttpParams().set("search", pesquisa)
      })
      .pipe(
        map((data: ReceivedData) => {
          let fichas: Datasheet[] = [];
          if (!data.error) {
            data.res.datasheets.forEach(element => {
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
            });
            fichas = data.res.datasheets;
          } else if (data.error === 2) {
            this.auth.forceLogout();
          }
          return fichas;
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
      idPage: idPage
    };
    if (data.id > -1) {
      dados.idobject = data.id;
    }
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
