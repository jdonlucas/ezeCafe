import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
// change localhost : 3000 to db . ezecafe . com . mx to production
export class OrderService {

  constructor(
      private _http: HttpClient,
  ) {
  }

  newOrder(orderData: any) {
    return this._http.post('http://localhost:3000/api/order/newOrder', { 
      orderData: orderData
    }).toPromise();
  }
  showOrder(id: any) {
    return this._http.post('http://localhost:3000/api/order/showOrder',{
      orderId: id
    }).toPromise();
  }
  showOrders(orderDate: any) {
    return this._http.post('http://localhost:3000/api/order/listAllOrders',{
      date: orderDate
    }).toPromise();
  }
  deleteOrder(orderId: any) {
    return this._http.post('http://localhost:3000/api/order/deleteOrder', { 
        orderId: orderId
    }).toPromise();
  }
  updateOrder(orderId: any,orderData: any) {   
    return this._http.post('http://localhost:3000/api/order/updateOrder', {
        orderData: orderData,
        params: {
            id: orderId
        }
    }).toPromise();
  }

  //associations
  newFoodOrder(foodData: any) {
    return this._http.post('http://localhost:3000/api/order/newFoodOrder', { 
        foodData: foodData
    }).toPromise();
  }
  newBeverageOrder(beverageData: any) {
    return this._http.post('http://localhost:3000/api/order/newBeverageOrder', { 
        beverageData: beverageData
    }).toPromise();
  }
  newSpecialOrder(specialData: any) {
    return this._http.post('http://localhost:3000/api/order/newSpecialOrder', { 
      specialData: specialData
    }).toPromise();
  }
  newExtraOrder(extraData: any) {
    return this._http.post('http://localhost:3000/api/order/newExtraOrder', { 
      extraData: extraData
    }).toPromise();
  }
  updateFoodOrder(id: any,foodData: any) {
    return this._http.post('http://localhost:3000/api/order/updateFoodOrder', {
      foodData: foodData,
      params: {
        id: id
      }
    }).toPromise();
  }
  updateBeverageOrder(id: any,beverageData: any) {
    return this._http.post('http://localhost:3000/api/order/updateBeverageOrder', {
      beverageOrder: beverageData,
      params: {
        id: id
      }
    }).toPromise();
  }
  updateSpecialOrder(id: any,orderSpecialData: any) {
    return this._http.post('http://localhost:3000/api/order/updateSpecialOrder', {
      specialData: orderSpecialData,
      params: {
        id: id
      }
    }).toPromise();
  }
  updateExtraOrder(id: any,orderExtraData: any) {
    return this._http.post('http://localhost:3000/api/order/updateExtraOrder', {
      extraData: orderExtraData,
      params: {
        id: id
      }
    }).toPromise();
  }
    
}