import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from "@angular/forms";
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { MenuService } from 'src/app/services/menu.service';
import { OrderService } from 'src/app/services/order.service';
import { SalesService } from 'src/app/services/sales.service';
import { PrintService } from 'src/app/services/print.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
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
  public menuList: any;
  public paymentForm: FormGroup;
  public foodItem = [];
  public beveragesItem = [];
  public menuItem = [];
  public itemsList = [];
  public beveragesSpecificList: any;
  public showSpecific = false;
  public show = true;
  public showFood = false;
  public showMenu = false;
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
    private _salesService: SalesService,
    public _printService: PrintService,
    private _spinnerService: Ng4LoadingSpinnerService) { }

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
    this.fetchMenu();
    this.orderId = this.route.snapshot.params.id;
    this._orderService.showOrder(this.orderId).then(res => {
      this.foodItem = res[0].food;
      this.beveragesItem = res[0].beverages;
      this.menuItem = res[0].special;
      this.orderName = res[0].name ? res[0].name : res[0].id;
      for(let i=0;i<this.foodItem.length;i++){
        for(let j=0;j<this.foodItem[i].FoodOrder.quantity;j++){
          this.itemsList.push({name: this.foodItem[i].product, price: this.foodItem[i].price,id:this.foodItem[i].id});
          this.totalAmount = this.totalAmount + this.foodItem[i].price;
        }
      }
      for(let i=0;i<this.beveragesItem.length;i++){
        for(let j=0;j<this.beveragesItem[i].BeveragesOrder.quantity;j++){
          this.itemsList.push({name: this.beveragesItem[i].beverage.product + ' ' + this.beveragesItem[i].type, price: this.beveragesItem[i].price,id:this.beveragesItem[i].id});
          this.totalAmount = this.totalAmount + this.beveragesItem[i].price;
        }
      }
      for(let i=0;i<this.menuItem.length;i++){
        for(let j=0;j<this.menuItem[i].specialOrder.quantity;j++){
          this.itemsList.push({name: this.menuItem[i].product + " (" + this.menuItem[i].type + ")", price: this.menuItem[i].price,id: this.menuItem[i].id});
          this.totalAmount = this.totalAmount + parseFloat(this.menuItem[i].price);
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
  fetchMenu() {
    this._menuService.showSpecial()
      .then(response => {
        this.menuList = response['specialList'].sort((a,b) => 
          a.product.localeCompare(b.product)
        );
      })
      .catch(err => this.errors = err);
  }

  toggle(btnId: any) {
    let divId = btnId.target.id;
    let element = document.getElementById(divId);
    if (divId == 'foodButton') {
      this.showFood = true;
      this.show = this.showMenu = false;
      if(!element.classList.contains('selected')) {
        element.classList.add('selected');
      }
      let bButton = document.getElementById('beveragesButton');
      bButton.classList.remove("selected");
      document.getElementById('menuButton').classList.remove('selected')
    } else if (divId == 'beveragesButton') {
      this.show = true;
      this.showFood = this.showMenu = false;
      if(!element.classList.contains('selected')) {
        element.classList.add('selected');
      }
      let bButton = document.getElementById('foodButton');
      bButton.classList.remove("selected");
      document.getElementById('menuButton').classList.remove('selected')
    } else {
      this.showMenu = true;
      this.showFood = this.show = false;
      if(!element.classList.contains('selected')) {
        element.classList.add('selected');
      }
      let bButton = document.getElementById('foodButton');
      bButton.classList.remove("selected");
      document.getElementById('beveragesButton').classList.remove('selected')
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
  addMenu(special) {
    let find: boolean;
    let quantity: any;
    let order: any;
    this.menuItem.forEach(x => {
      if(x.id == special.id) {
        find = true;
        quantity = x.specialOrder.quantity
        order = x.specialOrder.id
      } else {
        find = false;
      }
    })
    if(!find){
      let specialData = {
        specialId: special.id,
        orderId: this.orderId,
        quantity: 1
      };
      this._orderService.newSpecialOrder(specialData);
    } else {
      let specialData = { quantity: parseFloat(quantity) + 1 };
      this._orderService.updateSpecialOrder(order,specialData);
    }
    this.itemsList.push({name: special.product + " (" + special.type + ")",price: special.price});
    this.totalAmount = this.totalAmount + special.price;
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
    let index = this.itemsList.indexOf(item);
    this.totalAmount = this.totalAmount - item.price;
    this._orderService.updateOrder(this.orderId,{subtotal: this.totalAmount});
    if (index > -1) {
      this.itemsList.splice(index,1);
    }
    this.beveragesItem.forEach( x => {
      if(x.id == item.id) {
        let beverage = { quantity: parseFloat(x.BeveragesOrder.quantity) - 1};
        this._orderService.updateBeverageOrder(x.BeveragesOrder.id,beverage)
      }
    });
    this.foodItem.forEach(x => {
      if(x.id == item.id) {
        let foodData = { quantity: parseFloat(x.FoodOrder.quantity) - 1 };
        this._orderService.updateFoodOrder(x.FoodOrder.id,foodData);
      } 
    });
    this.menuItem.forEach(x => {
      if(x.id == item.id) {
        let special = { quantity: parseFloat(x.specialOrder.quantity) - 1};
        this._orderService.updateSpecialOrder(x.specialOrder.id,special);
      } 
    }); 
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
  async saveSale(payMethod) {
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
    this._spinnerService.show();
    await this._salesService.createSale(saleData)
      .then(response => {
        this._router.navigate(['/comandas/index']);
      })
      .catch(err => this.errors = err);
    this._spinnerService.hide();
  }

}
