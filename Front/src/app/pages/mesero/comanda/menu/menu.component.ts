import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormControlName } from "@angular/forms";
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { MenuService } from 'src/app/services/menu.service';
import { OrderService } from 'src/app/services/order.service';
import { SalesService } from 'src/app/services/sales.service';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Router } from "@angular/router";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public orderData: any;
  public orderForm: FormGroup;
  public paymentForm: FormGroup;
  public foodList: any;
  public beveragesList: any;
  public beveragesSpecificList: any;
  public errors: any
  public show = true;
  public showSpecific = false;
  public itemsList = [];
  public foodItems = [];
  public beverageItems = [];
  public totalAmount: number;
  public showConfirm = false;
  public closeC = false;
  public confirm = true;
  public alert = false;
  public pago = false;
  public calculator = false;
  private order: any;
  public userData: any;
  faTrash = faTrashAlt;

  constructor(
    private _store: Store<AppState>,
    private _router: Router,
    private _menuService: MenuService,
    private _orderService: OrderService,
    private _salesService: SalesService
    ) { }

  ngOnInit() {
    this._store.select('auth').subscribe(auth => {
      let authData = auth.authData ? auth.authData : {};
      this.userData = authData.user ? authData.user : {};
    });
    this.orderForm = new FormGroup ({
      name: new FormControl('',[])
    });
    this.paymentForm = new FormGroup ({
      amount: new FormControl('',[]),
      change: new FormControl('',[])
    });
    this.fetchBeverages();
    this.fetchFood();
    this.totalAmount = 0.00;
  }

  fetchBeverages() {
    this._menuService.showBeverages()
      .then(response => {
        this.beveragesList = response['menuBeverages'].sort((a,b) => 
          a.product.localeCompare(b.product)
        );
      })
      .catch(err => this.errors = err);
  }
  showBeveragesSpecific (id: any) {
    this._menuService.showSpecificBeverage(id)
      .then(response => {
        this.beveragesSpecificList = response['menuBeveragesSpecific'];
        this.showSpecific = true;
      })
      .catch(err => {
        this.errors = err;
      })
  }
  fetchFood() {
    this._menuService.showFood()
      .then(response => {
        this.foodList = response['foodList'].sort((a,b) => 
          a.product.localeCompare(b.product)
        );
      })
      .catch(err => this.errors = err);
  }

  toggle(btnId: any) {
    let divId = btnId.target.id;
    let element = document.getElementById(divId);
    if (divId == 'foodButton') {
      this.show = false;
      if(!element.classList.contains('selected')) {
        element.classList.add('selected');
      }
      let bButton = document.getElementById('beveragesButton');
      bButton.classList.remove("selected");
    } else {
      this.show = true;
      if(!element.classList.contains('selected')) {
        element.classList.add('selected');
      }
      let bButton = document.getElementById('foodButton');
      bButton.classList.remove("selected");
    }
  }
  hideSpecific() {
    this.showSpecific = false;
    this.showConfirm = false;
    this.closeC = false;
  }
  addBeverage(name,price,b) {
    this.itemsList.push({name: name,price: price});
    this.beverageItems.push({id: b.id});
    this.hideSpecific();
    this.totalAmount = this.totalAmount + price;
  }
  addFood(food) {
    this.itemsList.push({name: food.product,price: food.price});
    this.foodItems.push({id: food.id});
    this.totalAmount = this.totalAmount + food.price;
  }
  removeItem(item: any) {
    let index = this.itemsList.indexOf(item);
    this.totalAmount = this.totalAmount - item.price;
    if (index > -1) {
      this.itemsList.splice(index,1);
    }
  }
  toggleDiv(){
     this.showConfirm = !this.showConfirm;
  }
  saveOrder(){
    let foodData, beverageData;
    const orderData = {
      name: this.orderForm.value.name,
      status: 'pendiente',
      subtotal: this.totalAmount
    };
    this._orderService.newOrder(orderData).then(response => {
      let order = response['newOrder'];
      for(let i=0;i<this.foodItems.length;i++){
        foodData = {
          foodId: this.foodItems[i].id,
          orderId: order.id
        };
        this._orderService.newFoodOrder(foodData);
      };
      for(let i=0;i<this.beverageItems.length;i++){
        beverageData = {
          beveragesId: this.beveragesList[i].id,
          orderId: order.id
        };
        this._orderService.newBeverageOrder(beverageData);
      };
      this._router.navigate(['/comandas/index']);
    })
      .catch(err => this.errors = err);
  }
  confirmClose() {
    this.closeC = !this.closeC;
    this.confirm = true;
    this.alert = false;
  }
  closeOrder(){
    if(this.totalAmount != 0) {
      let foodData, beverageData;
      const orderData = {
        name: this.orderForm.value.name,
        status: 'cerrada',
        subtotal: this.totalAmount,
        UserId: this.userData.id
      };
      this._orderService.newOrder(orderData).then(response => {
        this.order = response['newOrder'];
        for(let i=0;i<this.foodItems.length;i++){
          foodData = {
            foodId: this.foodItems[i].id,
            orderId: this.order.id
          };
          this._orderService.newFoodOrder(foodData);
        };
        for(let i=0;i<this.beverageItems.length;i++){
          beverageData = {
            beveragesId: this.beveragesList[i].id,
            orderId: this.order.id
          };
          this._orderService.newBeverageOrder(beverageData);
        };
        this.confirm = false;
        this.pago = true;
      })
        .catch(err => this.errors = err);
    } else {
      this.confirm = false;
      this.alert = true;
    }
  }
  cash() {
    this.pago = false;
    this.calculator = true;
  }
  public onChange(event: Event): void {
    this.paymentForm.get('change').setValue(parseFloat((<HTMLInputElement>event.target).value) - this.totalAmount);
  }
  saveSale(payMethod) {
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
        ingreso: this.totalAmount,
        costo: this.totalAmount,
        OrderId: this.order.id
      } 
    } else if (payMethod == "cash") {
      saleData = {
        pago: 'efectivo',
        ingreso: ingreso,
        costo: this.totalAmount,
        OrderId: this.order.id
      } 
    }
    this._salesService.createSale(saleData)
      .then(response => {
        this._router.navigate(['/comandas/index']);
      })
      .catch(err => this.errors = err);
  }

}
