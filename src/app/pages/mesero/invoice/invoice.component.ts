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
  public extraItem = [];
  public discountItems = [];
  public discountItemsList = [];
  public orderName: any;
  public employee: any;
  public payment: any;
  public totalAmount: number;
  public amountDiscount: number;
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
      this.foodItem = res[0].food;
      this.beveragesItem = res[0].beverages;
      this.menuItem = res[0].special;
      this.extraItem = res[0].extra;
      this.discountItems = res[0].discount;
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
      for(let i=0;i<this.extraItem.length;i++){
        for(let j=0;j<this.extraItem[i].extraOrder.quantity;j++){
          this.itemsList.push({name: this.extraItem[i].product, price: this.extraItem[i].price});
          this.totalAmount = this.totalAmount + parseFloat(this.extraItem[i].price);
        }
      }
      for(let i=0;i<this.discountItems.length;i++){
        for(let j=0;j<this.discountItems[i].discountOrder.quantity;j++){
          this.discountItemsList.push({name: this.discountItems[i].name, type: this.discountItems[i].type,amount: this.discountItems[i].amount});
        }
      }

      this.checkDiscounts();
      Promise.all(this.itemsList)
        .then(() => this.printService.onDataReady());
    }).catch(err => { this.errors = err; })
  }
  checkDiscounts() {
    if(this.discountItems.length) {
      this.amountDiscount = this.totalAmount;
      this.discountItemsList.forEach( discount => {
        if (discount.type == 'percentage') {
          this.amountDiscount = Number((this.amountDiscount * ((100 - discount.amount)/100)).toFixed(2));
        } else {
          this.amountDiscount = Number((this.amountDiscount - discount.amount).toFixed(2));
        }
      })
    } else {
      this.amountDiscount = this.totalAmount;
    }
  }

}
