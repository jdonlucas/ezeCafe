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

  addFood(foodData: any) {
    //return this._http.post('http://localhost:3000/api/menu/newFood', {
    return this._http.post('http://db.ezecafe.com.mx/api/menu/newFood', {
      foodData: foodData
    }).toPromise();
  }
  updateFood(foodData: any) {
    //return this._http.post('http://localhost:3000/api/menu/newFood', {
      return this._http.post('http://db.ezecafe.com.mx/api/menu/updateFood',{
        foodData: foodData
    }).toPromise()
  }
  showFood() {
    //return this._http.post('http://localhost:3000/api/menu/newFood', {
      return this._http.get('http://db.ezecafe.com.mx/api/menu/listAllFood').toPromise()
  }

  deleteFood(foodId: any) {
    //return this._http.post('http://localhost:3000/api/menu/newFood', {
      return this._http.post('http://db.ezecafe.com.mx/api/menu/deleteFood',{
        foodId: foodId
    }).toPromise()
  }

  newBeverage(beverageData: any) {
    //return this._http.post('http://localhost:3000/api/menu/newFood', {
      return this._http.post('http://db.ezecafe.com.mx/api/menu/newBeverage',{
        beverageData: beverageData
    }).toPromise()
  }
  updateBeverage(beverageData: any) {
    //return this._http.post('http://localhost:3000/api/menu/newFood', {
      return this._http.post('http://db.ezecafe.com.mx/api/menu/updateBeverage',{
        beverageData: beverageData
    }).toPromise()
  }
  showBeverages() {
    //return this._http.post('http://localhost:3000/api/menu/newFood', {
      return this._http.get('http://db.ezecafe.com.mx/api/menu/listAllBeverages').toPromise()
  }
}