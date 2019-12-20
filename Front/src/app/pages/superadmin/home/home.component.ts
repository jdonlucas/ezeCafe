import { Component, OnInit } from '@angular/core';
import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';
import { OrderService } from 'src/app/services/order.service';
import { SalesService } from 'src/app/services/sales.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public total = 0.0;
  public totalOrders = 0;
  public pendingOrders = 0;
  faArrowCircleRight = faArrowCircleRight;

  constructor(
    private _orderService: OrderService,
    private _salesService: SalesService) { }

  ngOnInit() {
    this._salesService.showAllSales().then(resp => {
      let totalSales = resp['salesHistory'];
      for(let i=0;i<totalSales.length;i++) {
        this.total = this.total + totalSales[i].costo;
      }
    });
    this._orderService.showOrders().then(resp => {
      let orders = resp['orderHistory'];
      for(let i=0;i<orders.length;i++) {
        if(orders[i].status != 'cancelada') {
          this.totalOrders++;
        }
        if(orders[i].status == 'pendiente') {
          this.pendingOrders++;
        }
      }
    });
  }

}
