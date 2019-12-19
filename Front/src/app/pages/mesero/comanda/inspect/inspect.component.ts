import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { SalesService } from 'src/app/services/sales.service';
import { faUndo } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-inspect',
  templateUrl: './inspect.component.html',
  styleUrls: ['./inspect.component.css']
})
export class InspectComponent implements OnInit {

  public orderId: any;
  public foodItem = [];
  public beveragesItem = [];
  public itemsList = [];
  public orderName: any;
  public totalAmount: number;
  public errors: any
  faUndo = faUndo;

  constructor(private route: ActivatedRoute,
    private _orderService: OrderService,
    private _salesService: SalesService) { }

  ngOnInit() {
    this.totalAmount = 0.0;
    this.orderId = this.route.snapshot.params.id;
    this._orderService.showOrder(this.orderId).then(res => {
      this.foodItem = res[0].food;
      this.beveragesItem = res[0].beverages;
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
    }).catch(err => { this.errors = err; })
  }

}
