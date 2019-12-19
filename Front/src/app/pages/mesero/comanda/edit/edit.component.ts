import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from "@angular/forms";
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { MenuService } from 'src/app/services/menu.service';
import { OrderService } from 'src/app/services/order.service';
import { SalesService } from 'src/app/services/sales.service';
import { Router } from "@angular/router";
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  public foodList: any;
  public beveragesList: any;
  public paymentForm: FormGroup;
  public foodItem = [];
  public beveragesItem = [];
  public itemsList = [];
  public beveragesSpecificList: any;
  public showSpecific = false;
  public show = true;
  public showConfirm = false;
  public orderId: any;
  public closeC = false;
  public confirm = true;
  public alert = false;
  public pago = false;
  public calculator = false;
  public errors: any
  public userData: any;
  public totalAmount: number;
  public orderName: any;
  faTrash = faTrashAlt;

  constructor(private route: ActivatedRoute,
    private _store: Store<AppState>,
    private _router: Router,
    private _menuService: MenuService,
    private _orderService: OrderService,
    private _salesService: SalesService) { }

  ngOnInit() {
    this._store.select('auth').subscribe(auth => {
      let authData = auth.authData ? auth.authData : {};
      this.userData = authData.user ? authData.user : {};
    });
    this.paymentForm = new FormGroup ({
      amount: new FormControl('',[]),
      change: new FormControl({value: '', disabled: true},[])
    });
    this.totalAmount = 0.00;
    this.fetchBeverages();
    this.fetchFood();
    this.orderId = this.route.snapshot.params.id;
    this._orderService.showOrder(this.orderId).then(res => {
      this.foodItem = res[0].food;
      this.beveragesItem = res[0].beverages;
      this.orderName = res[0].name ? res[0].name : res[0].id;
      for(let i=0;i<this.foodItem.length;i++){
        for(let j=0;j<this.foodItem[i].FoodOrder.quantity;j++){
          this.itemsList.push({name: this.foodItem[i].product, price: this.foodItem[i].price});
          this.totalAmount = this.totalAmount + this.foodItem[i].price;
        }
      }
      for(let i=0;i<this.beveragesItem.length;i++){
        for(let j=0;j<this.beveragesItem[i].BeveragesOrder.quantity;j++){
          this.itemsList.push({name: this.beveragesItem[i].beverage.product + ' ' + this.beveragesItem[i].type, price: this.beveragesItem[i].price,id:this.beveragesItem[i].id});
          this.totalAmount = this.totalAmount + this.beveragesItem[i].price;
        }
      }
    }).catch(err => { this.errors = err; })
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
  toggleDiv(){
     this.showConfirm = !this.showConfirm;
  }
  hideSpecific() {
    this.showSpecific = false;
    this.showConfirm = false;
    this.closeC = false;
  }
  deleteOrder(){
    if(this.userData.UserRole > 2) {
      this._orderService.deleteOrder(this.orderId).then(() => {
        this._router.navigate(['/comandas/index']);
      });
    } else {
      let orderData = {
        status: 'cancelada'
      }
      this._orderService.updateOrder(this.orderId,orderData).then(() => {
        this._router.navigate(['/comandas/index']);
      });
    }
    
  }
  addFood(food) {
    let find: boolean;
    let quantity: any;
    let order: any;
    this.foodItem.forEach(x => {
      if(x.id == food.id) {
        find = true;
        quantity = x.FoodOrder.quantity
        order = x.FoodOrder.id
      } else {
        find = false;
      }
    })
    if(!find) {
      let foodData = {
        foodId: food.id,
        orderId: this.orderId,
        quantity: 1
      };
      this._orderService.newFoodOrder(foodData);
    } else {
      let foodData = { quantity: parseFloat(quantity) + 1 };
      this._orderService.updateFoodOrder(order,foodData);
      
    }
    this.itemsList.push({name: food.product,price: food.price});
    this.totalAmount = this.totalAmount + food.price;
    this._orderService.updateOrder(this.orderId,{subtotal: this.totalAmount});
  }
  addBeverage(name,price,b) {
    let find: boolean;
    let quantity: any;
    let order: any;
    this.beveragesItem.forEach(x => {
      if(x.id == b.id) {
        find = true;
        quantity = x.BeveragesOrder.quantity
        order = x.BeveragesOrder.id
      } else {
        find = false;
      }
    })
    if(!find) {
      let beverageData = {
        beveragesId: b.id,
        orderId: this.orderId,
        quantity: 1
      };
      this._orderService.newBeverageOrder(beverageData).then(() => {
        this.itemsList.push({name: name,price: price});
        this.hideSpecific();
        this.totalAmount = this.totalAmount + price;
        this._orderService.updateOrder(this.orderId,{subtotal: this.totalAmount});
      });
    } else  {
      let beverage = { quantity: parseFloat(quantity) + 1};
      this._orderService.updateBeverageOrder(order,beverage).then(() => {
        this.itemsList.push({name: name,price: price});
        this.hideSpecific();
        this.totalAmount = this.totalAmount + price;
        this._orderService.updateOrder(this.orderId,{subtotal: this.totalAmount});
      })
    }
  }

  removeItem(item: any) {
    let quantity: any;
    let order: any;
    let which: any;
    let index = this.itemsList.indexOf(item);
    this.totalAmount = this.totalAmount - item.price;
    this._orderService.updateOrder(this.orderId,{subtotal: this.totalAmount});
    if (index > -1) {
      this.itemsList.splice(index,1);
    }
    this.beveragesItem.forEach( x => {
      if(x.id == item.id) {
        quantity = x.BeveragesOrder.quantity;
        order = x.BeveragesOrder.id;
        which = 'beverage';
      }
    });
    this.foodItem.forEach(x => {
      if(x.id == item.id) {
        quantity = x.FoodOrder.quantity
        order = x.FoodOrder.id;
        which = 'food';
      } 
    });
    if(which == 'food') {
      let foodData = { quantity: parseFloat(quantity) - 1 };
      this._orderService.updateFoodOrder(order,foodData);
    } else if(which == 'beverage') {
      let beverage = { quantity: parseFloat(quantity) - 1};
      this._orderService.updateBeverageOrder(order,beverage)
    }
  }
  confirmClose() {
    this.closeC = !this.closeC;
    this.confirm = true;
    this.alert = false;
  }
  closeOrder() {
    if(this.totalAmount != 0) {
      this._orderService.updateOrder(this.orderId,{status: 'cerrada'});
      this.confirm = false;
      this.pago = true;
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
        OrderId: this.orderId
      } 
    } else if (payMethod == "cash") {
      saleData = {
        pago: 'efectivo',
        ingreso: ingreso,
        costo: this.totalAmount,
        OrderId: this.orderId
      } 
    }
    this._salesService.createSale(saleData)
      .then(response => {
        this._router.navigate(['/comandas/index']);
      })
      .catch(err => this.errors = err);
  }

}
