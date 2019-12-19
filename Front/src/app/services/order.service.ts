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
  showOrders() {
    return this._http.get('http://localhost:3000/api/order/listAllOrders').toPromise();
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
    
}