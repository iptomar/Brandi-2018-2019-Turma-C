import { Injectable } from '@angular/core';
import { HttpClient, HttpParams  } from '@angular/common/http'
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';
import { Global, ReceivedData } from 'src/app/Global';
import { map } from 'rxjs/operators';

export interface Contacto {
  id: number;
  full_name: string;
  cellphone:string;
  email: string;
}
@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  public static CONTACT_LIST = "contact/list";
  constructor(private http : HttpClient, private auth : AuthService) {
  }
   public getContacts(pesquisa : string): Observable<Array<Contacto>> {
    return this.http.get(Global.HOST_PREFIX + ContactsService.CONTACT_LIST, 
      {params: new HttpParams().set('search', pesquisa)} ).pipe(map((data: ReceivedData) => {
      let contact_list: Array<Contacto> = [];
      if(!data.error) {
        contact_list = <Array<Contacto>>data.res.contactos;
      }else if(this.auth.isAdmin()) this.auth.forceLogout(); 
      return contact_list;
    }));
  }

  /*
    falta criar contacto
  */
  public userExists(users : Contacto[], id : number) : boolean{
    for(let i = 0; i < users.length; i++) if(users[i].id === id) return true;
    return false;
  }
 
}


