import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
// change localhost : 3000 to db . ezecafe . com . mx to production
export class StockService {

  constructor(private _http: HttpClient) {
  }

  // services for insumos
  showInsumos(){
    return this._http.get('http://db.ezecafe.com.mx/api/insumos/list').toPromise();
  }
  modifyInsumos(updateInsumo: any, insumoId: any){
    return this._http.post('http://db.ezecafe.com.mx/api/insumos/update', {
        insumosData: updateInsumo, 
        params: {
            id: insumoId
        }
    }).toPromise();
  }
  addInsumo(insumoAddData: any) {
    return this._http.post('http://db.ezecafe.com.mx/api/insumos/new', {
        insumosData: insumoAddData 
    }).toPromise()
  }
  showOneInsumo(insumoId: any) {
    return this._http.post('http://db.ezecafe.com.mx/api/insumos/one', {
        insumosId: insumoId 
    }).toPromise()
  }
  deleteIsumo(insumoId: any) {
    return this._http.post('http://db.ezecafe.com.mx/api/insumos/delete', {
        insumosId: insumoId 
    }).toPromise()
  }
  //services for desposables
  showDesposable(){
    return this._http.get('http://db.ezecafe.com.mx/api/stock/list').toPromise();
  }
  modifyDesposable(desposableData: any, desposableId: any){
    return this._http.post('http://db.ezecafe.com.mx/api/stock/update', {
        stockData: desposableData, 
        params: {
            id: desposableId
        }
    }).toPromise();
  }
  addDesposable(desposableData: any) {
    return this._http.post('http://db.ezecafe.com.mx/api/stock/new', {
        stockData: desposableData 
    }).toPromise()
  }
  showOneDesposable(desposableId: any) {
    return this._http.post('http://db.ezecafe.com.mx/api/stock/one', {
        stockId: desposableId 
    }).toPromise()
  }
  deleteDesposable(desposableId) {
    return this._http.post('http://db.ezecafe.com.mx/api/stock/delete', {
        stockId: desposableId 
    }).toPromise()
  }

}