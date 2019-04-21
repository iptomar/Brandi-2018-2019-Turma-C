import { Injectable } from '@angular/core';
import { HttpClient, HttpParams  } from '@angular/common/http'
import { User, AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { Global, ReceivedData } from 'src/app/Global';
import { unescape } from 'querystring';

export interface UserType {
  id : number,
  name : string
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  public static USER_LIST = "user/list";

  public static USER_TYPE_LIST = "user/type/list";
  public static USER_DELETE = "user/delete";
  public static USER_EDIT = "user/change";
  public static USER_EDIT_PASSWORD = "user/changepassword";

  constructor(private http : HttpClient, private auth : AuthService) { 

  }

  public changeOwnPassword(oldPassword : string, newPassword : string) : Observable<ReceivedData> {
    return this.http.post<ReceivedData>(Global.HOST_PREFIX + UsersService.USER_EDIT_PASSWORD, {password: oldPassword, newpassword: newPassword} ).pipe(map((res) => {
      if(res.error == 3) this.auth.forceLogout();
      return res;
    }));
  }

  public changeOwnUser(user : User) : Observable<ReceivedData> {
    let u = {fullname: user.full_name, address: user.address, cellphone: user.cellphone, title: user.title, qualifications: user.qualifications};
    return this.http.post<ReceivedData>(Global.HOST_PREFIX + UsersService.USER_EDIT, u ).pipe(map((res) => {
      if(res.error == 3 && this.auth.isAdmin()) this.auth.forceLogout();
      return res;
    }));
  }

  public changeUser(user : User) : Observable<ReceivedData> {
    let u = {id: user.id, fullname: user.full_name, address: user.address, cellphone: user.cellphone, usertypeid: user.id_type_user, title: user.title, qualifications: user.qualifications};
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
      } else if(this.auth.isAdmin()) this.auth.forceLogout();
      return users;
    }));
  }
}
