import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Global, ReceivedData } from 'src/app/Global';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';



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
  providedIn: 'root'
})
export class CategoriesService {

  public static SUPER_CATEGORIES = "datasheet/super_categories/list";
  public static CATEGORIES = "datasheet/categories/list";
  public static SUB_CATEGORIES = "datasheet/sub_categories/list";

  public static EDIT_SUPER_CATEGORY = "datasheet/super_categories/change";
  public static EDIT_CATEGORY = "datasheet/categories/change";
  public static EDIT_SUB_CATEGORY = "datasheet/sub_categories/change";

  public static DELETE_SUPER_CATEGORY = "datasheet/super_categories/delete";
  public static DELETE_CATEGORY = "datasheet/categories/delete";
  public static DELETE_SUB_CATEGORY = "datasheet/sub_categories/delete";

  public static CREATE_SUPER_CATEGORY = "datasheet/super_categories/create";
  public static CREATE_CATEGORY = "datasheet/categories/create";
  public static CREATE_SUB_CATEGORY = "datasheet/sub_categories/create";
  
  constructor(
    private http: HttpClient,
    private auth: AuthService) { }



  public getSuperCategories(pesquisa: string): Observable<SuperCategories[]> {
    return this.http
      .get(Global.HOST_PREFIX + CategoriesService.SUPER_CATEGORIES, {
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
      .get(Global.HOST_PREFIX + CategoriesService.CATEGORIES, {
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
      .get(Global.HOST_PREFIX + CategoriesService.SUB_CATEGORIES, {
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

  
  public editSuperCat(id : number, name : string) : Observable<ReceivedData>{
    return this.http
      .post(Global.HOST_PREFIX + CategoriesService.EDIT_SUPER_CATEGORY, {id_super_category : id, name: name})
      .pipe(
        map((data: ReceivedData) => {
          if (this.auth.isAdmin() && data.error === 4) {
            this.auth.forceLogout();
          }
          return data;
        })
      );
  }

  public editCat(id : number, name : string) : Observable<ReceivedData>{
    return this.http
      .post(Global.HOST_PREFIX + CategoriesService.EDIT_CATEGORY, {id_category : id, name: name})
      .pipe(
        map((data: ReceivedData) => {
          if (this.auth.isAdmin() && data.error === 4) {
            this.auth.forceLogout();
          }
          return data;
        })
      );
  }

  public editSubCat(id : number, name : string) : Observable<ReceivedData>{
    return this.http
      .post(Global.HOST_PREFIX + CategoriesService.EDIT_SUB_CATEGORY, {id_sub_category : id, name: name})
      .pipe(
        map((data: ReceivedData) => {
          if (this.auth.isAdmin() && data.error === 4) {
            this.auth.forceLogout();
          }
          return data;
        })
      );
  }

  public deleteSuperCat(id : number) : Observable<ReceivedData>{
    return this.http
      .post(Global.HOST_PREFIX + CategoriesService.DELETE_SUPER_CATEGORY, {id_super_category : id})
      .pipe(
        map((data: ReceivedData) => {
          if (this.auth.isAdmin() && data.error === 4) {
            this.auth.forceLogout();
          }
          return data;
        })
      );
  }
  public deleteCat(id : number) : Observable<ReceivedData>{
    return this.http
      .post(Global.HOST_PREFIX + CategoriesService.DELETE_CATEGORY, {id_category : id})
      .pipe(
        map((data: ReceivedData) => {
          if (this.auth.isAdmin() && data.error === 4) {
            this.auth.forceLogout();
          }
          return data;
        })
      );
  }

  public deleteSubCat(id : number) : Observable<ReceivedData>{
    return this.http
      .post(Global.HOST_PREFIX + CategoriesService.DELETE_SUB_CATEGORY, {id_sub_category : id})
      .pipe(
        map((data: ReceivedData) => {
          if (this.auth.isAdmin() && data.error === 4) {
            this.auth.forceLogout();
          }
          return data;
        })
      );
  }

  public createSuperCat(name : string) : Observable<ReceivedData>{
    return this.http
      .post(Global.HOST_PREFIX + CategoriesService.CREATE_SUPER_CATEGORY, {name : name})
      .pipe(
        map((data: ReceivedData) => {
          if (this.auth.isAdmin() && data.error === 4) {
            this.auth.forceLogout();
          }
          return data;
        })
      );
  }

  public createCat(name : string, id_super_category : number) : Observable<ReceivedData>{
    return this.http
      .post(Global.HOST_PREFIX + CategoriesService.CREATE_CATEGORY, {id_super_category: id_super_category, name : name})
      .pipe(
        map((data: ReceivedData) => {
          if (this.auth.isAdmin() && data.error === 4) {
            this.auth.forceLogout();
          }
          return data;
        })
      );
  }

  public createSubCat(name : string, id_category : number) : Observable<ReceivedData>{
    return this.http
      .post(Global.HOST_PREFIX + CategoriesService.CREATE_SUB_CATEGORY, {name : name, id_category: id_category})
      .pipe(
        map((data: ReceivedData) => {
          if (this.auth.isAdmin() && data.error === 4) {
            this.auth.forceLogout();
          }
          return data;
        })
      );
  }
}
