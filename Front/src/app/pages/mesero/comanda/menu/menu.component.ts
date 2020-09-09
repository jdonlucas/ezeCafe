import { HostListener, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormControlName } from "@angular/forms";
import { Store } from '@ngrx/store';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppState } from 'src/app/app.reducer';
import { MenuService } from 'src/app/services/menu.service';
import { OrderService } from 'src/app/services/order.service';
import { SalesService } from 'src/app/services/sales.service';
import { PrintService } from 'src/app/services/print.service';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Router } from "@angular/router";
import { computeMsgId } from '@angular/compiler';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public orderData: any;
  public orderForm: FormGroup;
  public paymentForm: FormGroup;
  public platformGain: FormGroup;
  public foodList: any;
  public beveragesList: any;
  public menuList: any;
  public extraList: any;
  public beveragesSpecificList: any;
  public errors: any
  public show = true;
  public showFood = false;
  public showMenu = false;
  public showExtra = false;
  public showSpecific = false;
  public itemsList = [];
  public foodItems = [];
  public beverageItems = [];
  public menuItems = [];
  public extraItems = [];
  public totalAmount: number;
  public showConfirm = false;
  public closeC = false;
  public confirm = true;
  public alert = false;
  public pago = false;
  public calculator = false;
  public plataforma = false;
  private order: any;
  public userData: any;
  faTrash = faTrashAlt;

  constructor(
    private _store: Store<AppState>,
    private _router: Router,
    private _menuService: MenuService,
    private _orderService: OrderService,
    private _salesService: SalesService,
    public _printService: PrintService,
    private _spinnerService: NgxSpinnerService
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
    this.platformGain = new FormGroup ({
      plat: new FormControl('',[]),
      gain: new FormControl('',[])
    })
    this.fetchBeverages();
    this.fetchFood();
    this.fetchMenu();
    this.fetchExtra();
    this.totalAmount = 0.00;

  }

  @HostListener("window:beforeunload", ["$event"]) 
  unloadHandler(event: Event) {
    event.returnValue = false;
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
          b.type.localeCompare(a.type)
        );
      })
      .catch(err => this.errors = err);
  }

  fetchExtra() {
    this._menuService.showExtra()
      .then(response => {
        this.extraList = response['extraList'].sort((a,b) => 
          a.type.localeCompare(b.type)
        );
      })
      .catch(err => this.errors = err);
  }

  toggle(btnId: any) {
    let divId = btnId.target.id;
    let element = document.getElementById(divId);
    if (divId == 'foodButton') {
      this.showFood = true;
      this.show = this.showMenu = this.showExtra = false;
      if(!element.classList.contains('selected')) {
        element.classList.add('selected');
      }
      let bButton = document.getElementById('beveragesButton');
      bButton.classList.remove("selected");
      document.getElementById('menuButton').classList.remove('selected')
      document.getElementById('extraButton').classList.remove('selected')
    } else if (divId == 'beveragesButton') {
      this.show = true;
      this.showFood = this.showMenu = this.showExtra = false;
      if(!element.classList.contains('selected')) {
        element.classList.add('selected');
      }
      let bButton = document.getElementById('foodButton');
      bButton.classList.remove("selected");
      document.getElementById('menuButton').classList.remove('selected')
      document.getElementById('extraButton').classList.remove('selected')
    } else if (divId == 'menuButton') {
      this.showMenu = true;
      this.showFood = this.show = this.showExtra = false;
      if(!element.classList.contains('selected')) {
        element.classList.add('selected');
      }
      let bButton = document.getElementById('foodButton');
      bButton.classList.remove("selected");
      document.getElementById('beveragesButton').classList.remove('selected')
      document.getElementById('extraButton').classList.remove('selected')
    } else {
      this.showExtra = true;
      this.showFood = this.show = this.showMenu = false;
      if(!element.classList.contains('selected')) {
        element.classList.add('selected');
      }
      let bButton = document.getElementById('foodButton');
      bButton.classList.remove("selected");
      document.getElementById('beveragesButton').classList.remove('selected')
      document.getElementById('menuButton').classList.remove('selected')
    }
  }
  hideSpecific() {
    this.showSpecific = false;
    this.showConfirm = false;
    this.closeC = false;
  }
  addBeverage(name,price,b) {
    let beverage = this.beverageItems.find( item => item.id == b.id)
    if(typeof beverage == 'undefined'){
      this.beverageItems.push({id: b.id,quantity: 1});
    } else {
      let index = this.beverageItems.indexOf(beverage)
      this.beverageItems[index].quantity = this.beverageItems[index].quantity + 1;
    }
    this.itemsList.push({type: 'beverage',id: b.id,name: name,price: price});
    this.hideSpecific();
    this.totalAmount = this.totalAmount + price;
  }
  addFood(food) {
    let foodItem = this.foodItems.find(item => item.id == food.id)
    if(typeof foodItem == 'undefined'){
      this.foodItems.push({id: food.id,quantity: 1});
    } else {
      let index = this.foodItems.indexOf(foodItem)
      this.foodItems[index].quantity = this.foodItems[index].quantity + 1;
    }
    this.itemsList.push({type: 'food', id: food.id,name: food.product,price: food.price});
    this.totalAmount = this.totalAmount + food.price;
  }
  addMenu(special) {
    let specialItem = this.menuItems.find(item => item.id == special.id)
    if(typeof specialItem == 'undefined'){
      this.menuItems.push({id: special.id,quantity: 1});
    } else {
      let index = this.menuItems.indexOf(specialItem)
      this.menuItems[index].quantity = this.menuItems[index].quantity + 1;
    }
    this.itemsList.push({type: 'special', id: special.id,name: special.product + " (" + special.type + ")",price: special.price});
    this.totalAmount = this.totalAmount + special.price;
  }
  addExtra(extra) {
    let extraItem = this.extraItems.find(item => item.id == extra.id)
    if(typeof extraItem == 'undefined'){
      this.extraItems.push({id: extra.id,quantity: 1});
    } else {
      let index = this.extraItems.indexOf(extraItem)
      this.extraItems[index].quantity = this.extraItems[index].quantity + 1;
    }
    this.itemsList.push({type:'extra',id: extra.id,name: extra.product,price: extra.price});
    this.totalAmount = this.totalAmount + extra.price;
  }

  removeItem(item: any) {
    let index = this.itemsList.indexOf(item);
    this.totalAmount = this.totalAmount - item.price;
    if (index > -1) {
      this.itemsList.splice(index,1);
    }
    if (item.type == 'beverage') {
      let beverage = this.beverageItems.find( element => element.id == item.id)
      if (beverage.quantity == 1) {
        this.beverageItems.splice(this.beverageItems.indexOf(item),1);
      } else {
        let index = this.beverageItems.indexOf(item);
        this.beverageItems[index].quantity = this.beverageItems[index].quantity - 1;
      }
    } else if (item.type == 'food') {
      let foodItem = this.foodItems.find(element => element.id == item.id);
      if(foodItem.quantity == 1) {
        this.foodItems.splice(this.foodItems.indexOf(foodItem),1);
      } else {
        let index = this.foodItems.indexOf(foodItem);
        this.foodItems[index].quantity = this.foodItems[index].quantity - 1;
      }
    } else if (item.type == 'special') {
      let specialItem = this.menuItems.find(element => element.id == item.id)
      if (specialItem.quantity == 1) {
        this.menuItems.splice(this.menuItems.indexOf(specialItem),1);
      } else {
        let index = this.menuItems.indexOf(specialItem);
        this.menuItems[index].quantity = this.menuItems[index].quantity - 1;
      }
    } else if (item.type == 'extra') {
      let extraItem = this.extraItems.find(element => element.id == item.id)
      if(extraItem.quantity == 1) {
        this.extraItems.splice(this.extraItems.indexOf(extraItem),1);
      } else {
        let index = this.extraItems.indexOf(extraItem);
        this.extraItems[index].quantity = this.extraItems[index].quantity - 1;
      }
    }
  }
  toggleDiv(){
     this.showConfirm = !this.showConfirm;
  }
  async saveOrder(){
    let foodData = [], beverageData = [], menuData = [], extraData = [];
    const orderData = {
      name: this.orderForm.value.name,
      status: 'pendiente',
      subtotal: this.totalAmount,
      UserId: this.userData.id
    };
    this._spinnerService.show();
    await this._orderService.newOrder(orderData).then(response => {
      let order = response['newOrder'];
      for(let i=0;i<this.foodItems.length;i++){
        foodData.push({
          foodId: this.foodItems[i].id,
          orderId: order.id,
          quantity: this.foodItems[i].quantity
        });
      };
      for(let i=0;i<this.beverageItems.length;i++){
        beverageData.push({
          beveragesId: this.beverageItems[i].id,
          orderId: order.id,
          quantity: this.beverageItems[i].quantity
        });
      };
      for(let i=0;i<this.menuItems.length;i++){
        menuData.push({
          specialId: this.menuItems[i].id,
          orderId: order.id,
          quantity: this.menuItems[i].quantity
        });
      };
      for(let i=0;i<this.extraItems.length;i++){
        extraData.push({
          extraId: this.extraItems[i].id,
          orderId: order.id,
          quantity: this.extraItems[i].quantity
        });
      };
      let orderItems = {
        beverages: beverageData,
        food: foodData,
        special: menuData,
        extra: extraData
      }
      this._orderService.saveOrderItems(orderItems);
      this._router.navigate(['/comandas/index']);
    })
      .catch(err => this.errors = err);
    this._spinnerService.hide();
  }
  confirmClose() {
    this.closeC = !this.closeC;
    this.confirm = true;
    this.alert = false;
  }

  async closeOrder(){
    if(this.totalAmount != 0) {
      let foodData = [], beverageData = [], menuData = [], extraData = [];
      const orderData = {
        name: this.orderForm.value.name,
        status: 'cerrada',
        subtotal: this.totalAmount,
        UserId: this.userData.id
      };
      this._spinnerService.show();
      await this._orderService.newOrder(orderData).then(response => {
        this.order = response['newOrder'];
        for(let i=0;i<this.foodItems.length;i++){
          foodData.push({
            foodId: this.foodItems[i].id,
            orderId: this.order.id,
            quantity: this.foodItems[i].quantity
          });
        };
        for(let i=0;i<this.beverageItems.length;i++){
          beverageData.push({
            beveragesId: this.beverageItems[i].id,
            orderId: this.order.id,
            quantity: this.beverageItems[i].quantity
          });
        };
        for(let i=0;i<this.menuItems.length;i++){
          menuData.push({
            specialId: this.menuItems[i].id,
            orderId: this.order.id,
            quantity: this.menuItems[i].quantity
          });
        };
        for(let i=0;i<this.extraItems.length;i++){
          extraData.push({
            extraId: this.extraItems[i].id,
            orderId: this.order.id,
            quantity: this.extraItems[i].quantity
          });
        };
        let orderItems = {
          beverages: beverageData,
          food: foodData,
          special: menuData,
          extra: extraData
        }
        this._orderService.saveOrderItems(orderItems);
        this.confirm = false;
        this.pago = true;
      })
        .catch(err => this.errors = err);
      this._spinnerService.hide(); 
    } else {
      this.confirm = false;
      this.alert = true;
    }
  }
  cash() {
    this.pago = false;
    this.calculator = true;
  }
  platform() {
    this.pago = false;
    this.plataforma = true;
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
        OrderId: this.order.id
      } 
    } else if (payMethod == "cash") {
      saleData = {
        pago: 'efectivo',
        ingreso: ingreso,
        costo: this.totalAmount,
        OrderId: this.order.id
      } 
    } else if (payMethod == "platform") {
      saleData = {
        pago: 'plataforma',
        ingreso: this.platformGain.value.gain,
        costo: this.platformGain.value.gain,
        OrderId: this.order.id,
        plataforma: this.platformGain.value.plat
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
