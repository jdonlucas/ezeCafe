import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators, FormControlName } from "@angular/forms";
import { OrderService } from 'src/app/services/order.service';
import { SalesService } from 'src/app/services/sales.service';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-inspect',
  templateUrl: './inspect.component.html',
  styleUrls: ['./inspect.component.css']
})
export class InspectComponent implements OnInit {

  public orderId: any;
  public saleId: any;
  public foodItem = [];
  public beveragesItem = [];
  public paymentForm: FormGroup;
  public menuItem = [];
  public extraItem = [];
  public itemsList = [];
  public discountItems = [];
  public orderName: any;
  public employee: any;
  public payment: any;
  public totalAmount: number;
  public amountDiscount: number;
  public platform: string;
  public errors: any
  public show = false;
  public card = true;
  faArrowLeft = faArrowLeft;
  faEdit = faEdit;

  constructor(private route: ActivatedRoute,
    private _orderService: OrderService,
    private _salesService: SalesService) { }

  ngOnInit() {
    this.paymentForm = new FormGroup ({
      amount: new FormControl('',[]),
      change: new FormControl({value: '', disabled: true},[])
    });
    this.totalAmount = 0.0;
    this.orderId = this.route.snapshot.params.id;
    this._orderService.showOrder(this.orderId).then(res => {
      this.employee = res[0].User.Name + " " + (res[0].User.lastname ? res[0].User.lastname : '');
      this.payment = res[0].Sale ? res[0].Sale.pago : null;
      this.saleId = res[0].Sale ? res[0].Sale.id : null;
      this.foodItem = res[0].food;
      this.beveragesItem = res[0].beverages;
      this.menuItem = res[0].special;
      this.extraItem = res[0].extra;
      this.discountItems = res[0].discount;
      this.totalAmount = res[0].Sale ? res[0].Sale.costo : res[0].subtotal;
      this.platform = res[0].Sale ? res[0].Sale.plataforma : '';
      this.orderName = res[0].name ? res[0].name : res[0].id;
      for(let i=0;i<this.foodItem.length;i++){
        for(let j=0;j<this.foodItem[i].FoodOrder.quantity;j++){
          this.itemsList.push({name: this.foodItem[i].product, price: this.foodItem[i].price});
        }
      }
      for(let i=0;i<this.beveragesItem.length;i++){
        for(let j=0;j<this.beveragesItem[i].BeveragesOrder.quantity;j++){
          this.itemsList.push({name: this.beveragesItem[i].beverage.product + ' ' + this.beveragesItem[i].type, price: this.beveragesItem[i].price,id:this.beveragesItem[i].id});
        }
      }
      for(let i=0;i<this.menuItem.length;i++){
        for(let j=0;j<this.menuItem[i].specialOrder.quantity;j++){
          this.itemsList.push({name: this.menuItem[i].product + " (" + this.menuItem[i].type + ")", price: this.menuItem[i].price});
        }
      }
      for(let i=0;i<this.extraItem.length;i++){
        for(let j=0;j<this.extraItem[i].extraOrder.quantity;j++){
          this.itemsList.push({name: this.extraItem[i].product, price: this.extraItem[i].price});
        }
      }
      this.checkDiscounts();
    }).catch(err => { this.errors = err; })
  }
  showEdit() {
    this.show = true;
  }
  hide() {
    this.show = false;
  }
  updateSale (payMethod) {
    let saleData: any;
    let ingreso: any;
    if (this.paymentForm.value.amount == ''){
      ingreso = this.totalAmount;
    } else {
      ingreso = this.paymentForm.value.amount;
    }
    if(payMethod == "card"){
      saleData = {
        pago: 'tarjeta',
        ingreso: this.totalAmount
      } 
    } else if (payMethod == "cash") {
      saleData = {
        pago: 'efectivo',
        ingreso: ingreso
      } 
    }
    this._salesService.updateSale(saleData,this.saleId).then(res => {
      this.show = false;
      this._orderService.showOrder(this.orderId).then(res => {
        this.payment = res[0].Sale.pago;
      });
    });
  }
  cash() {
    this.card = false;
  }
  public onChange(event: Event): void {
    this.paymentForm.get('change').setValue(parseFloat((<HTMLInputElement>event.target).value) - this.amountDiscount);
  }
  checkDiscounts() {
    if(this.discountItems.length) {
      this.amountDiscount = this.totalAmount;
      this.discountItems.forEach( discount => {
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
