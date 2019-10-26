import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { SetComandaDataAction } from '../../../../ngrx/comanda.actions';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  public userData: any;
  public newOrder: any;

  private _comandaData: any;

  constructor(
    private _store: Store<AppState>,
    public _router: Router,
    public _orderService: OrderService) {
      this.setOrderData(JSON.parse(localStorage.getItem('comandaData')));
      this.initializeComandaSuscriber();
    }

  ngOnInit() {
    this._store.select('auth').subscribe(auth => {
      let authData = auth.authData ? auth.authData : {};
      this.userData = authData.user ? authData.user : {};
    });
  }


  initializeComandaSuscriber() {
    this._store.select('comanda').subscribe(comanda => {
      this._comandaData = comanda.comandaData ? comanda.comandaData : {};
    });
  }

  startOrder() {
    const user = { UserId: this.userData.id }
    this._orderService.newOrder(user)
      .then(response => {
        this.newOrder = response;
        this.setOrderData(this.newOrder);
      })
    this._router.navigate(['/mesero/comanda/menu']);
  }

  setOrderData(OrderData: any) {
    localStorage.setItem('comandaData', JSON.stringify(OrderData));
    this._store.dispatch(new SetComandaDataAction(OrderData));

  }

}
