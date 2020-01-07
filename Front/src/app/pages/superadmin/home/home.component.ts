import { Component, OnInit } from '@angular/core';
import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';
import { OrderService } from 'src/app/services/order.service';
import { SalesService } from 'src/app/services/sales.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [DatePipe]
})
export class HomeComponent implements OnInit {

  public total = 0.0;
  public totalOrders = 0;
  public pendingOrders = 0;
  faArrowCircleRight = faArrowCircleRight;

  constructor(
    private _orderService: OrderService,
    private _salesService: SalesService,
    private datePipe: DatePipe) { }

  ngOnInit() {
    let today = new Date();
    let queryDate = this.datePipe.transform(new Date(),'dd-MM-yyyy');
    this._salesService.showAllSales().then(resp => {
      let totalSales = resp['salesHistory'];
      for(let i=0;i<totalSales.length;i++) {
        if(this.datePipe.transform(today,'yyyy-MM-dd') == this.datePipe.transform(totalSales[i].createdAt,'yyyy-MM-dd')) {
          this.total = this.total + totalSales[i].costo;
        }
      }
    });
    this._orderService.showOrders(queryDate).then(resp => {
      let orders = resp['orderHistory'];
      for(let i=0;i<orders.length;i++) {
        if(orders[i].status != 'cancelada') {
          if(this.datePipe.transform(today,'yyyy-MM-dd') == this.datePipe.transform(orders[i].createdAt,'yyyy-MM-dd')) {
            this.totalOrders++;
          }
        }
        if(orders[i].status == 'pendiente') {
          if(this.datePipe.transform(today,'yyyy-MM-dd') == this.datePipe.transform(orders[i].createdAt,'yyyy-MM-dd')) {
            this.pendingOrders++;
          }
        }
      }
    });
  }

}
