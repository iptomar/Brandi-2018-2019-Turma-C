import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Global, ProcessedData, ReceivedData } from '../../Global';
import { map } from 'rxjs/operators'
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';


export interface User {
  id: number,
  full_name: string,
  email: string,
  address: string,
  birthday: Date,
  cellphone: string,
  type_user: string,
  id_type_user: number
  last_login: Date,
  qualifications: string,
  register_date: Date,
  title: string
}

export interface User_ProcessData {
  message: string,
  user: User
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  public static ADMIN_USER_TYPE = "Admin";

  public static USER_INFO = "user/info";
  public static USER_AUTH = "user/auth";
  public static USER_LOGOUT = "user/logout";


  private _user: User = null;

  constructor(private http: HttpClient, private router : Router) { }

  get user() {
    return this._user;
  }

  set user(user : User) {
    this._user = user;
  }

  private checkAuth(user_data: ReceivedData): User_ProcessData {
    let u: User_ProcessData = { message: user_data.message, user: null };
    if (!user_data.error) {
      //converte a string data para realmente a data
      user_data.res.last_login = Global.stringToDate(user_data.res.last_login);
      user_data.res.register_date = Global.stringToDate(user_data.res.register_date);
      user_data.res.birthday = Global.stringToDate(user_data.res.birthday);
      //guarda os dados do utilizador
      this._user = <User>user_data.res;
      u.user = this._user;
    }
    return u;
  }

  private isLoggedInStatic(): Observable<User_ProcessData> {
    if (this.isAuthenticated()) return of({ message: "Está autenticado", user: this._user });
    else return null;
  }

  public isLoggedIn(): Observable<User_ProcessData> {
    let r = this.isLoggedInStatic();
    if (r !== null) return r;
    return this.http.get(Global.HOST_PREFIX + AuthService.USER_INFO).pipe(map((user_data: ReceivedData) => {
      return this.checkAuth(user_data);
    }));
  }

  public authenticate(email: string, password: string): Observable<User_ProcessData> {
    let r = this.isLoggedInStatic();
    if (r !== null) return r;
    return this.http.post(Global.HOST_PREFIX + AuthService.USER_AUTH, { email: email, password: password }).pipe(map((user_data: ReceivedData) => {
      return this.checkAuth(user_data);
    }));
  }

  public isAdmin(): boolean {
    return this.isAuthenticated() && this.user.type_user === AuthService.ADMIN_USER_TYPE;
  }

  public forceLogout(): Observable<void> {
    this._user = null;
    this.router.navigate([""]);
    return this.http.get(Global.HOST_PREFIX + AuthService.USER_LOGOUT).pipe(map((user_data: ReceivedData) => {}));
  }

  public logout(): Observable<void> {
    return this.http.get(Global.HOST_PREFIX + AuthService.USER_LOGOUT).pipe(map((user_data: ReceivedData) => {
      this._user = null;
    }));
  }

  public isAuthenticated() {
    return this.user != null;
  }

  get user_full_name() {
    return this.isAuthenticated() ? this._user.full_name : "";
  }

}
