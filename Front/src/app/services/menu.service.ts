import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class MenuService {

  constructor(
      private _http: HttpClient,
  ) {
  }

  /*deleteUser(id: any) {
    //return this._http.post('http://localhost:3000/api/users/delete', {
    return this._http.post('http://db.ezecafe.com.mx/api/users/delete', {
      userId: id
    }).toPromise();
  }*/
    
}