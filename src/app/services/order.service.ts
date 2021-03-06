import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from './../../environments/environment';
@Injectable({
  providedIn: 'root'
})
// change localhost : 3000 to db . ezecafe . com . mx to production
export class OrderService {
  
  apiUrl = environment.apiUrl;

  constructor(
      private _http: HttpClient,
  ) {
  }

  newOrder(orderData: any) {
    return this._http.post(this.apiUrl + 'api/order/newOrder', { 
      orderData: orderData
    }).toPromise();
  }
  showOrder(id: any) {
    return this._http.post(this.apiUrl + 'api/order/showOrder',{
      orderId: id
    }).toPromise();
  }
  showOrders(orderDate: any) {
    return this._http.post(this.apiUrl + 'api/order/listAllOrders',{
      date: orderDate
    }).toPromise();
  }
  deleteOrder(orderId: any) {
    return this._http.post(this.apiUrl + 'api/order/deleteOrder', { 
        orderId: orderId
    }).toPromise();
  }
  updateOrder(orderId: any,orderData: any) {   
    return this._http.post(this.apiUrl + 'api/order/updateOrder', {
        orderData: orderData,
        params: {
            id: orderId
        }
    }).toPromise();
  }

  //associations

  //-------------------
  saveOrderItems(items: any) {
    return this._http.post(this.apiUrl + 'api/order/saveItems', {
      items: items
    }).toPromise()
  }
  //-------------------
  updateFoodOrder(id: any,foodData: any) {
    return this._http.post(this.apiUrl + 'api/order/updateFoodOrder', {
      foodData: foodData,
      params: {
        id: id
      }
    }).toPromise();
  }
  updateBeverageOrder(id: any,beverageData: any) {
    return this._http.post(this.apiUrl + 'api/order/updateBeverageOrder', {
      beverageOrder: beverageData,
      params: {
        id: id
      }
    }).toPromise();
  }
  updateSpecialOrder(id: any,orderSpecialData: any) {
    return this._http.post(this.apiUrl + 'api/order/updateSpecialOrder', {
      specialData: orderSpecialData,
      params: {
        id: id
      }
    }).toPromise();
  }
  updateExtraOrder(id: any,orderExtraData: any) {
    return this._http.post(this.apiUrl + 'api/order/updateExtraOrder', {
      extraData: orderExtraData,
      params: {
        id: id
      }
    }).toPromise();
  }
  createDiscount(discountData: any) {
    return this._http.post(this.apiUrl + 'api/order/createDiscount', {
      discountData: discountData
    }).toPromise();
  }
  updateDiscount(id:any,discountData: any) {
    return this._http.post(this.apiUrl + 'api/order/updateDiscount', {
      discountId: id,
      discountData: discountData
    }).toPromise();
  }
  removeDiscount(discountId: any, orderId: any) {
    return this._http.post(this.apiUrl + 'api/order/removeDiscount', {
      discountId: [discountId, orderId]
    }).toPromise();
  }
    
}