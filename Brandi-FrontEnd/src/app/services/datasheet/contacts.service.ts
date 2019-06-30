import { Injectable } from '@angular/core';
import { HttpClient, HttpParams  } from '@angular/common/http'
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';
import { Global, ReceivedData } from 'src/app/Global';
import { map } from 'rxjs/operators';

export interface Contact {
  id: number;
  full_name: string;
  address:string;
  email: string;
  phone:string;
}
@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  public static LIST_CONTACTACTS = "datasheet/contacts/list";
  public static CREATE_CONTACTACTS = "datasheet/contacts/create";
  constructor(private http : HttpClient, private auth : AuthService) {
  }
  

  public getContacts(search: string): Observable<Contact[]> {
    return this.http
      .get(Global.HOST_PREFIX + ContactsService.LIST_CONTACTACTS ,{
        params: new HttpParams().set("search", search)
      })
      .pipe(
        map((data: ReceivedData) => {
          if(!data.error) {
            return <Contact[]>data.res.contacts;
          }else if (data.error === 1) {
            this.auth.forceLogout();
          }
          return [];
        })
      );
  }

  public createContact(name: string,address: string,email: string,phone: string): Observable<ReceivedData> {
    return this.http
      .post(Global.HOST_PREFIX + ContactsService.CREATE_CONTACTACTS ,{
        full_name: name,
        address: address,
        email: email,
        phone:phone
      })
      .pipe(
        map((data: ReceivedData) => {
          if (data.error === 1) {
            this.auth.forceLogout();
          }
          return data;
        })
      );
  }
}


