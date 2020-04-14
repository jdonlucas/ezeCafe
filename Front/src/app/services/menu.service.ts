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
    return this._http.post('http://localhost:7000/api/menu/newFood', {
      foodData: foodData
    }).toPromise();
  }
  updateFood(foodData: any, foodId: any) {
      return this._http.post('http://localhost:7000/api/menu/updateFood',{
        foodData: foodData,
        params: {
          id: foodId
        }
    }).toPromise()
  }
  showFood() {
      return this._http.get('http://localhost:7000/api/menu/listAllFood').toPromise()
  }

  deleteFood(foodId: any) {
      return this._http.post('http://localhost:7000/api/menu/deleteFood',{
        foodId: foodId
    }).toPromise()
  }
  // bebidas
  newBeverage(beverageData: any) {
      return this._http.post('http://localhost:7000/api/menu/newBeverage',{
        beverageData: beverageData
    }).toPromise()
  }
  updateBeverage(beverageData: any, beverageId: any) {
      return this._http.post('http://localhost:7000/api/menu/updateBeverage',{
        beverageData: beverageData,
        params: {
          id: beverageId
        }
    }).toPromise()
  }
  showBeverages() {
      return this._http.get('http://localhost:7000/api/menu/listAllBeverages').toPromise()
  }
  deleteBeverage(beverageId: any) {
    return this._http.post('http://localhost:7000/api/menu/deleteBeverage',{
      beverageId: beverageId
    }).toPromise()
  }
  // bebidas especifico
  showSpecificBeverage (beverageId: any) {
    return this._http.post('http://localhost:7000/api/menu/listAllBeveragesSpecific',{
      beverageSpecificId: beverageId
    }).toPromise()
  }
  showOneBeverage (beverageId: any) {
    return this._http.post('http://localhost:7000/api/menu/showBeverageSpecific',{
      beverageId: beverageId.id
    }).toPromise()
  }
  newSpecificBeverage (beverageData: any) {
    return this._http.post('http://localhost:7000/api/menu/newBeverageSpecific',{
      beverageData: beverageData
    }).toPromise()
  }
  updateBeverageSpecific (beverageData: any, id: any) {
    return this._http.post('http://localhost:7000/api/menu/updateBeverageSpecific',{
      beverageData: beverageData,
      params: {
        id: id
      }
    }).toPromise()
  }
  deleteBeverageSpecific(beverageId: any) {
    return this._http.post('http://localhost:7000/api/menu/deleteBeverageSpecific',{
      beverageId: beverageId
    }).toPromise()
  }
  //menu promo y empleados
  addSpecial(specialData: any) {
    return this._http.post('http://localhost:7000/api/menu/newSpecial', {
      specialData: specialData
    }).toPromise();
  }
  updateSpecial(specialData: any, specialId: any) {
      return this._http.post('http://localhost:7000/api/menu/updateSpecial',{
        specialData: specialData,
        params: {
          id: specialId
        }
    }).toPromise()
  }
  showSpecial() {
      return this._http.get('http://localhost:7000/api/menu/listAllSpecial').toPromise()
  }

  deleteSpecial(specialId: any) {
      return this._http.post('http://localhost:7000/api/menu/deleteSpecial',{
        specialId: specialId
    }).toPromise()
  }
}