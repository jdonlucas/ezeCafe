import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';

import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
// change localhost : 3000 to db . ezecafe . com . mx to production
export class ApiService {

  apiUrl = environment.apiUrl;

  constructor(
    private _store: Store<AppState>,
    private _http: HttpClient,
  ) {
  }

  getAuthToken() {
    return this._store.select('auth').subscribe(auth => {
      let authData = auth.authData ? auth.authData : {};
      return authData.user ? authData.user.token : {};
    });
  }

  graphqlAuth(data: object) {
    return this._http.post(this.apiUrl + 'graphql/', data, {
        headers: new HttpHeaders({ "Content-Type": "application/json" })
    }).toPromise()
  }

  graphql(data: object) {
    return this._http.post(this.apiUrl + 'graphql/', data, {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.getAuthToken()}` 
      })
    }).toPromise()
  }

}