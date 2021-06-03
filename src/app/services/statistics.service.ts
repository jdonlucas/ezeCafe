import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
// change localhost : 3000 to db . ezecafe . com . mx to production
export class StatisticsService {

  apiUrl = environment.apiUrl;

  constructor(
      private _http: HttpClient,
  ) {
  }

  getMonth(date: any) {
      return this._http.post(this.apiUrl + 'api/statistics/monthSales', { 
        date: date
      }).toPromise();
  }
  getWeek(start, end) {
      return this._http.post(this.apiUrl + 'api/statistics/weekSales', { 
        start: start,
        end: end
      }).toPromise();
  }
  years() {
    return this._http.get(this.apiUrl + 'api/statistics/getYears').toPromise();
  }
  getDay(day: any) {
    return this._http.post(this.apiUrl + 'api/statistics/daySales', {
      date: day
    }).toPromise()
  }
  getYear(year: any) {
    return this._http.post(this.apiUrl + 'api/statistics/yearSales', {
      date: year
    }).toPromise()
  }
  getFood(option: any, date: any) {
    return this._http.post(this.apiUrl + 'api/statistics/getFoods', {
      date:  date,
      option: option
    }).toPromise()
  }
  getDrink(option: any, date: any) {
    return this._http.post(this.apiUrl + 'api/statistics/getDrinks', {
      date:  date,
      option: option
    }).toPromise()
  }
  // Venta de stickers
  getStickersSale(date: any) {
    return this._http.post(this.apiUrl + 'api/statistics/stickersSales', {
      date:  date,
    }).toPromise()
  }
}