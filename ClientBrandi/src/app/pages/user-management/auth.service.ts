import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Credential } from './auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _httpClient: HttpClient) { }

  login(credential: Credential): Promise<any> {
    const url = `/api/auth`;

    return this._httpClient.post(url, credential)
      .toPromise()
      .then(data => {
        console.log("result ", data);
        return data;
      });
  }
}
