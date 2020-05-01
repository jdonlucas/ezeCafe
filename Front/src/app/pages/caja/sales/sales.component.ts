import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { OrderService } from 'src/app/services/order.service';
import { SalesService } from 'src/app/services/sales.service';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { faPrint } from '@fortawesome/free-solid-svg-icons';
import { DatePipe } from '@angular/common';
import { PrintService } from 'src/app/services/print.service';
import { MomentDateAdapter,MAT_MOMENT_DATE_FORMATS,MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css'],
  providers: [DatePipe,{
    provide: DateAdapter,
    useClass: MomentDateAdapter,
    deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
  },

  {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},]
})
export class SalesComponent implements OnInit {

  date = new FormControl(new Date());
  startDate = new Date();
  public userData: any;
  public newOrder: any;
  public orderId: any;
  public orders = [];
  public errorCode: any;
  public cash = 0.0;
  public card = 0.0;
  public plataforma = 0.0;
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
    public _printService: PrintService,
    private _adapter: DateAdapter<any>) {
      this._adapter.setLocale('es');
    }

  ngOnInit() {
    this._store.select('auth').subscribe(auth => {
      let authData = auth.authData ? auth.authData : {};
      this.userData = authData.user ? authData.user : {};
    });
    this.fetchOrders();
  }

  fetchOrders() {
    let queryDate = this.datePipe.transform(this.date.value,'dd-MM-yyyy');
    this.orders = [];
    this.card = 0.0;
    this.cash = 0.0;
    this.plataforma = 0.0;
    this._orderService.showOrders(queryDate).then(response => {
        for(let i=0;i<response["orderHistory"].length;i++) {
          if(response["orderHistory"][i].status == 'cerrada'){
            this.orders.push(response["orderHistory"][i]);
            if(response["orderHistory"][i].Sale.pago == 'tarjeta') {
              this.card = this.card + response["orderHistory"][i].Sale.costo
            } else if (response["orderHistory"][i].Sale.pago == 'efectivo') {
              this.cash = this.cash + response["orderHistory"][i].Sale.costo
            } else if (response["orderHistory"][i].Sale.pago == 'plataforma') {
              this.plataforma = this.cash + response["orderHistory"][i].Sale.costo
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
