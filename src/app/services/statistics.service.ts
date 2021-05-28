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
  getWeek(start, end) {
      return this._http.post('https://db.ezecafe.com.mx/api/statistics/weekSales', { 
        start: start,
        end: end
      }).toPromise();
  }
  years() {
    return this._http.get('https://db.ezecafe.com.mx/api/statistics/getYears').toPromise();
  }
  getDay(day: any) {
    return this._http.post('https://db.ezecafe.com.mx/api/statistics/daySales', {
      date: day
    }).toPromise()
  }
  getYear(year: any) {
    return this._http.post('https://db.ezecafe.com.mx/api/statistics/yearSales', {
      date: year
    }).toPromise()
  }
  getFood(option: any, date: any) {
    return this._http.post('https://db.ezecafe.com.mx/api/statistics/getFoods', {
      date:  date,
      option: option
    }).toPromise()
  }
  getDrink(option: any, date: any) {
    return this._http.post('https://db.ezecafe.com.mx/api/statistics/getDrinks', {
      date:  date,
      option: option
    }).toPromise()
  }
  // Venta de stickers
  getStickersSale(date: any) {
    return this._http.post('https://db.ezecafe.com.mx/api/statistics/stickersSales', {
      date:  date,
    }).toPromise()
  }
}