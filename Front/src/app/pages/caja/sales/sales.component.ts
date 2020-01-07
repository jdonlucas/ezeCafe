import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { SalesService } from 'src/app/services/sales.service';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { faPrint } from '@fortawesome/free-solid-svg-icons';
import { DatePipe } from '@angular/common';
import { PrintService } from 'src/app/services/print.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css'],
  providers: [DatePipe]
})
export class SalesComponent implements OnInit {

  public userData: any;
  public newOrder: any;
  public orderId: any;
  public orders = [];
  public errorCode: any;
  public cash = 0.0;
  public card = 0.0;
  public delete = false;
  public cancel = false;
  faPlus = faPlus;
  faTrashAlt = faTrashAlt;
  faEdit = faEdit;
  faEye = faEye;
  faPrint = faPrint;

  constructor(
    private _store: Store<AppState>,
    public _router: Router,
    public _orderService: OrderService,
    private _salesService: SalesService,
    private datePipe: DatePipe,
    public _printService: PrintService) {
    }

  ngOnInit() {
    this._store.select('auth').subscribe(auth => {
      let authData = auth.authData ? auth.authData : {};
      this.userData = authData.user ? authData.user : {};
    });
    this.fetchOrders();
  }

  fetchOrders() {
    let today = new Date();
    this._orderService.showOrders().then(response => {
        for(let i=0;i<response["orderHistory"].length;i++) {
          if(response["orderHistory"][i].status == 'cerrada'){
            if(this.datePipe.transform(today,'yyyy-MM-dd') == this.datePipe.transform(response["orderHistory"][i].createdAt,'yyyy-MM-dd')) {
              this.orders.push(response["orderHistory"][i]);
              if(response["orderHistory"][i].Sale.pago == 'tarjeta') {
                this.card = this.card + response["orderHistory"][i].Sale.costo
              } else if (response["orderHistory"][i].Sale.pago == 'efectivo') {
                this.cash = this.cash + response["orderHistory"][i].Sale.costo
              }
            }
          }
          this.orders.sort((a,b) => 
            b.createdAt.localeCompare(a.createdAt)
          );
        }
      }).catch(err => {
        this.errorCode = err.error;
      })
  }

  startOrder() {
    this._router.navigate(['/comandas/index/crear']);
  }
  hide() {
    this.delete = false;
    this.cancel = false;
  }
  deleteOrder(id: any){
    this.orderId = id
    if(this.userData.UserRole > 2) {
      this.delete = true;
    } else {
      this.cancel = true;
    }
  }
  confirmDelete(){
    this._salesService.deleteSale(this.orderId);
    this._orderService.deleteOrder(this.orderId).then(res => {
      this.hide();
      this.fetchOrders();
      this.orderId = '';
    }).catch(err => {});
  }
  confirmCancel(){
    let orderData = {
      status: 'cancelada'
    }
    this._orderService.updateOrder(this.orderId,orderData)
      .then(response => {
        this.hide();
        this.fetchOrders();
        this.orderId = '';
      }).catch(err => {});
  }
  
  printCorte() {
    this._printService.printCorte('corte');
  }
}
