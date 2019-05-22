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
      )/*,
      prop_met_date_prop: this.datePipe.transform(
        data.prop_met_date_prop,
        "yyyy-MM-dd"
      ),
      prop_met_date_accepted: this.datePipe.transform(
        data.prop_met_date_accepted,
        "yyyy-MM-dd"
      )*/,
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
      /*

   dimensions:"";
   other_dimensions: "";
   typology: "";
   location: "";
   owner: any;              //mudar para tipo de dados certo
   restore_owner: any;      //mudar para tipo de dados certo
   pay_guy: any;            //mudar para tipo de dados certo
   group_item: false;
   group_description: "";
   group_parts:"";
   materials: "";
   author_brand: "";
   assembly_brand: "";
   construct_brand: "";
   pat_classification: "";
   style: "";
   time_period: "";
   quality: "";
   material_struct: "";
   material_superficie: "";
   material_accessory: "";
   technique_struct: "";
   technique_superficie: "";
   technique_accessory: "";
   brief_descript: "";
   analogies: "";
   conclusions: "";
   authorship: "";
   datation: ""; //???
   origin_place: "";
   place_description: "";
   anual_fc_temp: number;
   anual_fc_humidity: number;
   anual_fc_per_in: number;
   anual_fc_per_end: number;
   anual_qs_temp: number;
   anual_qs_humidity: number;
   anual_qs_per_in: number;
   anual_qs_per_end: number;
   rad_type_nat:"";
   rad_ilum_nat: number;
   rad_UV_nat_med:number;
   rad_UV_nat_real:number;
   rad_type_art:"";
   rad_ilum_art: number;
   rad_UV_nat_art:number;
   rad_UV_nat_art:number;
   polution_agent: "";
   polution_origin: "";
   polution_result: "";
   observation2: "";
   i_m_t_t_p: false;
   i_i_e_o: false;
   c_e_conserv: false;
   i_p_a_b:false;
   d_o_e_i_t_s_a: false;
   e_p_m_e_i: false;
   tab_interpret_results: "";
   tab_conclusions: "";
   det_fis_quim_mec_struct: "";
   det_fis_quim_mec_superficie: "";
   det_fis_quim_mec_accessory: "";
   det_bio_struct: "";
   det_bio_superficie: "";
   det_bio_accessory: "";
   det_bio_conclusion: "";
   //fim da tab estado
   int_anteriores_struct: "";
   int_anteriores_superficie: "";
   int_anteriores_accessory: "";
   int_anteriores_conclusion: "";
   prop_owner_int_preserv: false;
   prop_owner_int_conserv: false;
   prop_owner_int_restore: false;
   prop_owner_int_specifics: "";
   prop_interv_preserv: false;
   prop_interv_conserv: false;
   prop_interv_restore: false;
   prop_met_interv_struct: "";
   prop_met_interv_resources_struct: "";
   prop_met_interv_superficie: "";
   prop_met_interv_resources_superficie: "";
   prop_met_interv_accessories: "";
   prop_met_interv_resources_accessories: "";
   prop_met_conclusions: "";
   prop_met_interloc_ipt: any;          //substituir por tipo de dados correto
   prop_met_interloc_client: any;      //substituir por tipo de dados correto
   prop_met_date_prop: new Date();     //nao esquecer de tratar com a funcao do Global para datas
   prop_met_date_accepted: new Date(); //nao esquecer de tratar com a funcao do Global para datas
   interv_struct: "";
   interv_superficie: "";
   interv_accessories: "";
   interv_struct_resoures: "";
   interv_superficie_resoures: "";
   interv_accessories_resoures: "";
   interv_concusions: "";
   sources: any;                      //check if right type
   */
    };
  }
}
