import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Credential } from './auth.model';
import { HOSTNAME } from '../Includes/defaults';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _httpClient: HttpClient) { }

  login(credential: Credential): Promise<any> {

    return this._httpClient.post(HOSTNAME + "auth", credential)
      .toPromise()
      .then(data => {
        console.log("result ", data);
        return data;
      });
  }
}
