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
        return this._http.post('http://localhost:3000/api/statistics/monthSales', { 
          date: date
        }).toPromise();
    }
    getWeek(start, end) {
        return this._http.post('http://localhost:3000/api/statistics/weekSales', { 
          start: start,
          end: end
        }).toPromise();
    }
    years() {
      return this._http.get('http://localhost:3000/api/statistics/getYears').toPromise();
    }
    getDay(day: any) {
      return this._http.post('http://localhost:3000/api/statistics/daySales', {
        date: day
      }).toPromise()
    }
}