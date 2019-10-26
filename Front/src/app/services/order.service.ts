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

  newOrder(orderData: string) {
    return this._http.post('http://localhost:3000/api/order/newOrder', { 
      orderData: orderData
    }).toPromise();
  }
  showOrder() {
    return this._http.get('http://localhost:3000/api/order/showOrder').toPromise();
  }
  showOrders() {
    return this._http.post('http://localhost:3000/api/order/listAllOrders',{}).toPromise();
  }
  deleteOrder(orderId: string) {
    return this._http.post('http://localhost:3000/api/order/deleteOrder', { 
        orderId: orderId
    }).toPromise();
  }

  //associations
  newFoodOrder(foodData: string) {
    return this._http.post('http://localhost:3000/api/order/newFoodOrder', { 
        foodData: foodData
    }).toPromise();
  }
  newBeverageOrder(beverageData: string) {
    return this._http.post('http://localhost:3000/api/order/newBeverageOrder', { 
        beverageData: beverageData
    }).toPromise();
  }
    
}