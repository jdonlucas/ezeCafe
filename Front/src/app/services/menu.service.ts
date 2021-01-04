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
    return this._http.post('https://db.ezecafe.com.mx/api/menu/newFood', {
      foodData: foodData
    }).toPromise();
  }
  updateFood(foodData: any, foodId: any) {
      return this._http.post('https://db.ezecafe.com.mx/api/menu/updateFood',{
        foodData: foodData,
        params: {
          id: foodId
        }
    }).toPromise()
  }
  showFood() {
      return this._http.get('https://db.ezecafe.com.mx/api/menu/listAllFood').toPromise()
  }

  deleteFood(foodId: any) {
      return this._http.post('https://db.ezecafe.com.mx/api/menu/deleteFood',{
        foodId: foodId
    }).toPromise()
  }
  // bebidas
  newBeverage(beverageData: any) {
      return this._http.post('https://db.ezecafe.com.mx/api/menu/newBeverage',{
        beverageData: beverageData
    }).toPromise()
  }
  updateBeverage(beverageData: any, beverageId: any) {
      return this._http.post('https://db.ezecafe.com.mx/api/menu/updateBeverage',{
        beverageData: beverageData,
        params: {
          id: beverageId
        }
    }).toPromise()
  }
  showBeverages() {
      return this._http.get('https://db.ezecafe.com.mx/api/menu/listAllBeverages').toPromise()
  }
  deleteBeverage(beverageId: any) {
    return this._http.post('https://db.ezecafe.com.mx/api/menu/deleteBeverage',{
      beverageId: beverageId
    }).toPromise()
  }
  // bebidas especifico
  showSpecificBeverage (beverageId: any) {
    return this._http.post('https://db.ezecafe.com.mx/api/menu/listAllBeveragesSpecific',{
      beverageSpecificId: beverageId
    }).toPromise()
  }
  showOneBeverage (beverageId: any) {
    return this._http.post('https://db.ezecafe.com.mx/api/menu/showBeverageSpecific',{
      beverageId: beverageId.id
    }).toPromise()
  }
  newSpecificBeverage (beverageData: any) {
    return this._http.post('https://db.ezecafe.com.mx/api/menu/newBeverageSpecific',{
      beverageData: beverageData
    }).toPromise()
  }
  updateBeverageSpecific (beverageData: any, id: any) {
    return this._http.post('https://db.ezecafe.com.mx/api/menu/updateBeverageSpecific',{
      beverageData: beverageData,
      params: {
        id: id
      }
    }).toPromise()
  }
  deleteBeverageSpecific(beverageId: any) {
    return this._http.post('https://db.ezecafe.com.mx/api/menu/deleteBeverageSpecific',{
      beverageId: beverageId
    }).toPromise()
  }
  //menu promo y empleados
  addSpecial(specialData: any) {
    return this._http.post('https://db.ezecafe.com.mx/api/menu/newSpecial', {
      specialData: specialData
    }).toPromise();
  }
  updateSpecial(specialData: any, specialId: any) {
      return this._http.post('https://db.ezecafe.com.mx/api/menu/updateSpecial',{
        specialData: specialData,
        params: {
          id: specialId
        }
    }).toPromise()
  }
  showSpecial() {
      return this._http.get('https://db.ezecafe.com.mx/api/menu/listAllSpecial').toPromise()
  }

  deleteSpecial(specialId: any) {
      return this._http.post('https://db.ezecafe.com.mx/api/menu/deleteSpecial',{
        specialId: specialId
    }).toPromise()
  }
  // menu extras
  addExtra(extraData: any) {
    return this._http.post('https://db.ezecafe.com.mx/api/menu/newExtra', {
      extraData: extraData
    }).toPromise();
  }
  updateExtra(extraData: any, extraId: any) {
      return this._http.post('https://db.ezecafe.com.mx/api/menu/updateExtra',{
        extraData: extraData,
        params: {
          id: extraId
        }
    }).toPromise()
  }
  showExtra() {
      return this._http.get('https://db.ezecafe.com.mx/api/menu/listAllExtra').toPromise()
  }

  deleteExtra(extraId: any) {
      return this._http.post('https://db.ezecafe.com.mx/api/menu/deleteExtra',{
        extraId: extraId
    }).toPromise()
  }
  // discounts 

  addDiscount(discountData: any) {
    return this._http.post('https://db.ezecafe.com.mx/api/menu/newDiscount', {
      discountData: discountData
    }).toPromise();
  }
  updateDiscount(discountData: any, discountId: any) {
      return this._http.post('https://db.ezecafe.com.mx/api/menu/updateDiscount',{
        discountData: discountData,
        params: {
          id: discountId
        }
    }).toPromise()
  }
  showDiscount() {
      return this._http.get('https://db.ezecafe.com.mx/api/menu/listAllDiscount').toPromise()
  }

  deleteDiscount(discountId: any) {
      return this._http.post('https://db.ezecafe.com.mx/api/menu/deleteDiscount',{
        discountId: discountId
    }).toPromise()
  }
}