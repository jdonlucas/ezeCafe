import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
// change localhost : 3000 to db . ezecafe . com . mx to production
export class SalesService {

  constructor(
      private _http: HttpClient,
  ) {
  }

    createSale(salesData: any) {
        return this._http.post('https://db.ezecafe.com.mx/api/sales/newSale', { 
            salesData: salesData
        }).toPromise();
    }
    showAllSales(date: any) {
        return this._http.post('https://db.ezecafe.com.mx/api/sales/listAllSales',{
            date: date
        }).toPromise();
    }
       
    updateSale(salesData: any,id: any) {
        return this._http.post('https://db.ezecafe.com.mx/api/sales/updateSale', {
            salesData: salesData,
            params: {
                id: id
            }
        }).toPromise();
    }
    deleteSale(id: any) {
        return this._http.post('https://db.ezecafe.com.mx/api/sales/deleteSale', {
            saleId: id,
        }).toPromise();
    }
    createNewRegisterStatus(cajaData: any) {
        return this._http.post('https://db.ezecafe.com.mx/api/sales/newStatus', {
            cajaData: cajaData
        }).toPromise();
    }
    updateRegisterStatus(cajaData: any, id: any) {
        return this._http.post('https://db.ezecafe.com.mx/api/sales/updateStatus', {
            cajaData: cajaData,
            params: {
                id: id
            }
        }).toPromise();
    }
    showregisterStatus() {
        return this._http.get('https://db.ezecafe.com.mx/api/sales/listAllStatus').toPromise();
    }
}