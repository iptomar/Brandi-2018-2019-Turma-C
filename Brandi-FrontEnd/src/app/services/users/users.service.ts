import { Injectable } from '@angular/core';
import { HttpClient, HttpParams  } from '@angular/common/http'
import { User, AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { Global, ReceivedData } from 'src/app/Global';
import { unescape } from 'querystring';
import { DatePipe, formatDate } from '@angular/common';

export interface UserType {
  id : number,
  name : string
}

export interface UserNames {
  id: number,
  full_name: string
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  public static USER_LIST = "user/list";
  public static USER_LIST_NAMES = "user/listNames";
  public static USER_LIST_NAMES_TECHNITIANS = "user/listTechnitNames";

  public static USER_TYPE_LIST = "user/type/list";
  public static USER_DELETE = "user/delete";
  public static USER_EDIT = "user/change";
  public static USER_REGISTER = "user/register";
  public static USER_EDIT_PASSWORD = "user/changepassword";

  constructor(private http : HttpClient, private auth : AuthService,private datePipe : DatePipe) { 

  }  

  public changeOwnPassword(oldPassword : string, newPassword : string) : Observable<ReceivedData> {
    return this.http.post<ReceivedData>(Global.HOST_PREFIX + UsersService.USER_EDIT_PASSWORD, {password: oldPassword, newpassword: newPassword} ).pipe(map((res) => {
      if(res.error == 3) this.auth.forceLogout();
      return res;
    }));
  }

  public registerUser(user: User, password : string) {
    let u = {email: user.email,birthday: this.datePipe.transform(user.birthday,'yyyy-MM-dd'),usertypeid: user.id_type_user, password: password,fullname: user.full_name, address: user.address, cellphone: user.cellphone, title: user.title, qualifications: user.qualifications};
    return this.http.post<ReceivedData>(Global.HOST_PREFIX + UsersService.USER_REGISTER, u ).pipe(map((res) => {
      if(res.error == 3 && this.auth.isAdmin()) this.auth.forceLogout();
      return res;
    }));
  }

  public changeOwnUser(user : User) : Observable<ReceivedData> {
    let u = {fullname: user.full_name, address: user.address,birthday: this.datePipe.transform(user.birthday,'yyyy-MM-dd'), cellphone: user.cellphone, title: user.title, qualifications: user.qualifications};
    return this.http.post<ReceivedData>(Global.HOST_PREFIX + UsersService.USER_EDIT, u ).pipe(map((res) => {
      if(res.error == 3 && this.auth.isAdmin()) this.auth.forceLogout();
      return res;
    }));
  }

  public changeUser(user : User) : Observable<ReceivedData> {
    let u = {id: user.id, fullname: user.full_name,birthday: this.datePipe.transform(user.birthday,'yyyy-MM-dd') , address: user.address, cellphone: user.cellphone, usertypeid: user.id_type_user, title: user.title, qualifications: user.qualifications};
    return this.http.post<ReceivedData>(Global.HOST_PREFIX + UsersService.USER_EDIT, u ).pipe(map((res) => {
      if(res.error == 3 && this.auth.isAdmin()) this.auth.forceLogout();
      return res;
    }));
  }


  public deleteUser(id : number): Observable<ReceivedData> {
    return this.http.post<ReceivedData>(Global.HOST_PREFIX + UsersService.USER_DELETE, {id: id} ).pipe(map((res) => {
      if(res.error == 4 && this.auth.isAdmin()) this.auth.forceLogout();
      return res;
    }));
  }

  public getUserTypes(pesquisa : string): Observable<Array<UserType>> {
    return this.http.get(Global.HOST_PREFIX + UsersService.USER_TYPE_LIST, {params: new HttpParams().set('search', pesquisa)} ).pipe(map((data: ReceivedData) => {
      let userTypes: Array<UserType> = [];
      if(!data.error) {
        userTypes = <Array<UserType>>data.res.user_types;
      }else if(this.auth.isAdmin()) this.auth.forceLogout();
      return userTypes;
    }));
  }

  public getUsers(pesquisa : string): Observable<Array<User>> {
    return this.http.get(Global.HOST_PREFIX + UsersService.USER_LIST, {params: new HttpParams().set('search', pesquisa)} ).pipe(map((data: ReceivedData) => {
      let users: Array<User> = [];
      if(!data.error) {
        data.res.users.forEach(element => {
          //converte a string data para realmente a data
          element.last_login = Global.stringToDate(element.last_login);
          element.register_date = Global.stringToDate(element.register_date);
          element.birthday = Global.stringToDate(element.birthday);
        });
        users = <Array<User>>data.res.users;
      } else if(this.auth.isAdmin()){
        this.auth.forceLogout();
      }
      return users;
    }));
  }

  public getUsersNames(pesquisa : string): Observable<Array<UserNames>> {
    return this.http.get(Global.HOST_PREFIX + UsersService.USER_LIST_NAMES, {params: new HttpParams().set('search', pesquisa)} ).pipe(map((data: ReceivedData) => {
      let users: Array<UserNames> = [];
      if(!data.error) {
        users = <Array<UserNames>>data.res.users;
      } else {
        this.auth.forceLogout();
      }
      return users;
    }));
  }
  
  public getUsersTechnitiansNames(pesquisa : string): Observable<Array<UserNames>> {
    return this.http.get(Global.HOST_PREFIX + UsersService.USER_LIST_NAMES_TECHNITIANS, {params: new HttpParams().set('search', pesquisa)} ).pipe(map((data: ReceivedData) => {
      let technitians: Array<UserNames> = [];
      if(!data.error) {
        technitians = <Array<UserNames>>data.res.technitians;
      } else {
        this.auth.forceLogout();
      }
      return technitians;
    }));
  }
  

  public userExists(users : User[], id : number) : boolean{
    for(let i = 0; i < users.length; i++) if(users[i].id === id) return true;
    return false;
  }
}
