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

    getMonth(date: any) {
        return this._http.post('https://db.ezecafe.com.mx/api/statistics/monthSales', { 
          date: date
        }).toPromise();
    }
}