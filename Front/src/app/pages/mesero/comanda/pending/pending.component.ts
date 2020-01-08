import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { SalesService } from 'src/app/services/sales.service';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { faPrint } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { DatePipe } from '@angular/common';
import { PrintService } from 'src/app/services/print.service';

@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.css'],
  providers: [DatePipe]
})
export class PendingComponent implements OnInit {

  public userData: any;
  public newOrder: any;
  public orderId: any;
  public orders = [];
  public errorCode: any;
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
    public _printService: PrintService) { }

  ngOnInit() {
    this._store.select('auth').subscribe(auth => {
      let authData = auth.authData ? auth.authData : {};
      this.userData = authData.user ? authData.user : {};
    });
    this.fetchOrders();
  }
  print(printOrderId: any) {
    this._printService.printDocument('invoice',printOrderId);
  }
  fetchOrders() {
    let today = new Date();
    let queryDate = this.datePipe.transform(new Date(),'dd-MM-yyyy');
    this._orderService.showOrders(queryDate).then(response => {
        let ordersHis = response["orderHistory"];
        for(let i=0;i<ordersHis.length;i++){
          if(ordersHis[i].status == 'pendiente'){
            this.orders.push(ordersHis[i]);
          }
        }
        this.orders.sort((a,b) => 
          b.createdAt.localeCompare(a.createdAt)
        );
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

}
