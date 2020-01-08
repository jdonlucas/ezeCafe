import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { DatePipe } from '@angular/common';
import { PrintService } from 'src/app/services/print.service';

@Component({
  selector: 'app-corte',
  templateUrl: './corte.component.html',
  styleUrls: ['./corte.component.css'],
  providers: [DatePipe]
})
export class CorteComponent implements OnInit {

  public orders = [];
  public card = 0;
  public cash = 0;
  public totalAmount = 0;

  constructor(
    public _orderService: OrderService,
    private datePipe: DatePipe,
    private printService: PrintService) { }

  ngOnInit() {
    let today = new Date();
    let queryDate = this.datePipe.transform(new Date(),'dd-MM-yyyy');
    this._orderService.showOrders(queryDate).then(response => {
        for(let i=0;i<response["orderHistory"].length;i++) {
          if(response["orderHistory"][i].status == 'cerrada'){
            this.orders.push(response["orderHistory"][i]);
            if(response["orderHistory"][i].Sale.pago == 'tarjeta') {
              this.card = this.card + response["orderHistory"][i].Sale.costo
            } else if (response["orderHistory"][i].Sale.pago == 'efectivo') {
              this.cash = this.cash + response["orderHistory"][i].Sale.costo
            }
            this.totalAmount = this.totalAmount + response["orderHistory"][i].Sale.costo;
          }
          this.orders.sort((a,b) => 
            b.createdAt.localeCompare(a.createdAt)
          );
        }
      Promise.all(this.orders)
      .then(() => this.printService.onDataReadyCorte());
      })
  }

}
