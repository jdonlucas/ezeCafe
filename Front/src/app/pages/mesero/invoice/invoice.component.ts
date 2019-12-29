import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { SalesService } from 'src/app/services/sales.service';
import { PrintService } from 'src/app/services/print.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

  public orderId: any;
  public saleId: any;
  public foodItem = [];
  public beveragesItem = [];
  public menuItem = [];
  public itemsList = [];
  public orderName: any;
  public employee: any;
  public payment: any;
  public totalAmount: number;
  public errors: any
  public show = false;
  public card = true;

  constructor(private route: ActivatedRoute,
    private _orderService: OrderService,
    private _salesService: SalesService,
    private printService: PrintService) { }

  ngOnInit() {
    this.totalAmount = 0.0;
    this.orderId = this.route.snapshot.params.id;
    this._orderService.showOrder(this.orderId).then(res => {
      this.employee = res[0].User.Name + " " + (res[0].User.lastname ? res[0].User.lastname : '');
      this.payment = res[0].Sale.pago;
      this.saleId = res[0].Sale.id;
      this.foodItem = res[0].food;
      this.beveragesItem = res[0].beverages;
      this.menuItem = res[0].special;
      this.orderName = res[0].name ? res[0].name : res[0].id;
      for(let i=0;i<this.foodItem.length;i++){
        for(let j=0;j<this.foodItem[i].FoodOrder.quantity;j++){
          this.itemsList.push({name: this.foodItem[i].product, price: this.foodItem[i].price});
          this.totalAmount = this.totalAmount + parseFloat(this.foodItem[i].price);
        }
      }
      for(let i=0;i<this.beveragesItem.length;i++){
        for(let j=0;j<this.beveragesItem[i].BeveragesOrder.quantity;j++){
          this.itemsList.push({name: this.beveragesItem[i].beverage.product + ' ' + this.beveragesItem[i].type, price: this.beveragesItem[i].price,id:this.beveragesItem[i].id});
          this.totalAmount = this.totalAmount + parseFloat(this.beveragesItem[i].price);
        }
      }
      for(let i=0;i<this.menuItem.length;i++){
        for(let j=0;j<this.menuItem[i].specialOrder.quantity;j++){
          this.itemsList.push({name: this.menuItem[i].product + " (" + this.menuItem[i].type + ")", price: this.menuItem[i].price});
          this.totalAmount = this.totalAmount + parseFloat(this.menuItem[i].price);
        }
      }
    }).catch(err => { this.errors = err; })
    //Promise.all(this.itemsList)
    //  .then(() => this.printService.onDataReady());
  }

}
