import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { MenuService } from 'src/app/services/menu.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.css']
})
export class FoodComponent implements OnInit {

  public orderData: any;
  public foodList: any;
  public errors: any

  constructor(
    private _store: Store<AppState>,
    private _menuService: MenuService,
    private _orderService: OrderService) { }

  ngOnInit() {
    this._store.select('comanda').subscribe(comanda => {
      let comandaData = comanda.comandaData ? comanda.comandaData : {};
      this.orderData = comandaData.newOrder ? comandaData.newOrder : {};
      this.fetchFood();
    });
  }

  fetchFood() {
    this._menuService.showFood()
      .then(response => {
        this.foodList = response['foodList'];
      })
      .catch(err => this.errors = err);
  }

  addFood(id: any) {
    const foodData = {
      foodId: id,
      orderId: this.orderData.id,
      quantity: 1
    }
    console.log(foodData);
    this._orderService.newFoodOrder(foodData)
      .then(response => {
        console.log(response);
      })

  }

}
