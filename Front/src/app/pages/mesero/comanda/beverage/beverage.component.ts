import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { MenuService } from 'src/app/services/menu.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-beverage',
  templateUrl: './beverage.component.html',
  styleUrls: ['./beverage.component.css']
})
export class BeverageComponent implements OnInit {

  public beverageList: any;
  public orderData: any;
  public beveragesList: any;
  public errors: any;

  constructor(
    private _store: Store<AppState>,
    private _menuService: MenuService,
    private _orderService: OrderService) { }

  ngOnInit() {
    this._store.select('comanda').subscribe(comanda => {
      let comandaData = comanda.comandaData ? comanda.comandaData : {};
      this.orderData = comandaData.id ? comandaData.id : {};
    });
    this.fetchBeverages();
  }

  fetchBeverages() {
    this._menuService.showBeverages()
      .then(response => {
        this.beveragesList = response['menuBeverages'];
      })
      .catch(err => this.errors = err);
  }

  addBeverage(id: any) {
    let beverageId: any;
    const beverage = { id: id }
    this._menuService.showOneBeverage(beverage)
      .then(response => {
        beverageId = response['beverage']['0'].id;
        const beverageData = {
          beverageId: beverageId,
          orderId: this.orderData.id,
          quantity: 1
        }
        console.log(beverageData);
        this._orderService.newBeverageOrder(beverageData)
          .then(response => {

          })
          .catch(err => {this.errors = err});
      })
      .catch(err => { this.errors = err });
    
  }
}
