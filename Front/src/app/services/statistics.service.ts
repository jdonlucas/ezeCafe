import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
// change localhost : 3000 to db . ezecafe . com . mx to production
export class StatisticsService {

  constructor(
      private _http: HttpClient,
  ) {
  }

    getMonth(salesData: any) {
        return this._http.post('http://localhost:3000/api/statistics/monthSales', { 
            salesData: salesData
        }).toPromise();
    }
}