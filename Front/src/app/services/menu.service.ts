import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
// change localhost : 3000 to db . ezecafe . com . mx to production
export class MenuService {

  constructor(
      private _http: HttpClient,
  ) {
  }
  // comida
  addFood(foodData: any) {
    return this._http.post('http://localhost:3000/api/menu/newFood', {
      foodData: foodData
    }).toPromise();
  }
  updateFood(foodData: any) {
      return this._http.post('http://localhost:3000/api/menu/updateFood',{
        foodData: foodData
    }).toPromise()
  }
  showFood() {
      return this._http.get('http://localhost:3000/api/menu/listAllFood').toPromise()
  }

  deleteFood(foodId: any) {
      return this._http.post('http://localhost:3000/api/menu/deleteFood',{
        foodId: foodId
    }).toPromise()
  }
  // bebidas
  newBeverage(beverageData: any) {
      return this._http.post('http://localhost:3000/api/menu/newBeverage',{
        beverageData: beverageData
    }).toPromise()
  }
  updateBeverage(beverageData: any, beverageId: any) {
      return this._http.post('http://localhost:3000/api/menu/updateBeverage',{
        beverageData: beverageData,
        params: {
          id: beverageId
        }
    }).toPromise()
  }
  showBeverages() {
      return this._http.get('http://localhost:3000/api/menu/listAllBeverages').toPromise()
  }
  deleteBeverage(beverageId: any) {
    return this._http.post('http://localhost:3000/api/menu/deleteBeverage',{
      beverageId: beverageId
    }).toPromise()
  }
  // bebidas especifico
  showSpecificBeverage (beverageId: any) {
    return this._http.post('http://localhost:3000/api/menu/listAllBeveragesSpecific',{
      beverageSpecificId: beverageId
    }).toPromise()
  }
  newSpecificBeverage (beverageData: any) {
    return this._http.post('http://localhost:3000/api/menu/newBeverageSpecific',{
      beverageData: beverageData
    }).toPromise()
  }
  updateBeverageSpecific (beverageData: any, id: any) {
    return this._http.post('http://localhost:3000/api/menu/newBeverageSpecific',{
      beverageData: beverageData,
      params: {
        id: id
      }
    }).toPromise()
  }
}