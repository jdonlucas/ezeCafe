import { HostListener, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from "@angular/forms";
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { MenuService } from 'src/app/services/menu.service';
import { OrderService } from 'src/app/services/order.service';
import { SalesService } from 'src/app/services/sales.service';
import { PrintService } from 'src/app/services/print.service';
import { NgxSpinnerService } from 'ngx-spinner';
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
  public extraList: any;
  public orderForm: FormGroup;
  public paymentForm: FormGroup;
  public platformGain: FormGroup;
  public foodItem = [];
  public beveragesItem = [];
  public menuItem = [];
  public extraItem = [];
  public discountItems = [];
  public discountItemsList = [];
  public itemsList = [];
  public discountList = [];
  private employeeDiscount = [];
  public beveragesSpecificList: any;
  public showSpecific = false;
  public show = true;
  public showFood = false;
  public showMenu = false;
  public showExtra = false;
  public showDiscount = false;
  public showConfirm = false;
  public orderId: any;
  public closeC = false;
  public confirm = true;
  public alert = false;
  public pago = false;
  public calculator = false;
  public plataforma = false;
  public errors: any
  public userData: any;
  public totalAmount: number;
  public amountDiscount: number;
  public showAlert = false;
  public showAlert2 = false;
  public orderName: any;
  faTrash = faTrashAlt;

  constructor(private route: ActivatedRoute,
    private _store: Store<AppState>,
    private _router: Router,
    private _menuService: MenuService,
    private _orderService: OrderService,
    private _salesService: SalesService,
    public _printService: PrintService,
    private _spinnerService: NgxSpinnerService) { }

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
    this.fetchExtra();
    this.fetchDiscount()
    this.orderId = this.route.snapshot.params.id;
    this.orderForm = new FormGroup ({
      name: new FormControl('',[])
    });
    this.platformGain = new FormGroup ({
      plat: new FormControl('',[]),
      gain: new FormControl('',[])
    })
    this._orderService.showOrder(this.orderId).then(res => {
      this.foodItem = res[0].food;
      this.beveragesItem = res[0].beverages;
      this.extraItem = res[0].extra;
      this.menuItem = res[0].special;
      this.discountItems = res[0].discount;
      this.orderName = res[0].name ? res[0].name : res[0].id;
      for(let i=0;i<this.foodItem.length;i++){
        for(let j=0;j<this.foodItem[i].FoodOrder.quantity;j++){
          this.itemsList.push({name: this.foodItem[i].product, price: this.foodItem[i].price,id:this.foodItem[i].id, type: 'food'});
          this.totalAmount = this.totalAmount + this.foodItem[i].price;
          this.amountDiscount = this.totalAmount;
        }
      }
      for(let i=0;i<this.beveragesItem.length;i++){
        for(let j=0;j<this.beveragesItem[i].BeveragesOrder.quantity;j++){
          this.itemsList.push({name: this.beveragesItem[i].beverage.product + ' ' + this.beveragesItem[i].type, price: this.beveragesItem[i].price,id:this.beveragesItem[i].id,
          type: 'beverage'});
          this.totalAmount = this.totalAmount + this.beveragesItem[i].price;
          this.amountDiscount = this.totalAmount;
        }
      }
      for(let i=0;i<this.menuItem.length;i++){
        for(let j=0;j<this.menuItem[i].specialOrder.quantity;j++){
          this.itemsList.push({name: this.menuItem[i].product + " (" + this.menuItem[i].type + ")", price: this.menuItem[i].price,id: this.menuItem[i].id,
          type: 'special'});
          this.totalAmount = this.totalAmount + parseFloat(this.menuItem[i].price);
          this.amountDiscount = this.totalAmount;
        }
      }
      for(let i=0;i<this.extraItem.length;i++){
        for(let j=0;j<this.extraItem[i].extraOrder.quantity;j++){
          this.itemsList.push({name: this.extraItem[i].product, price: this.extraItem[i].price,id: this.extraItem[i].id,
          type: 'extra'});
          this.totalAmount = this.totalAmount + parseFloat(this.extraItem[i].price);
          this.amountDiscount = this.totalAmount;
        }
      }
      for(let i=0;i<this.discountItems.length;i++){
        for(let j=0;j<this.discountItems[i].discountOrder.quantity;j++){
        this.discountItemsList.push({
          id: this.discountItems[i].id,name: this.discountItems[i].name,type: this.discountItems[i].type, amount: this.discountItems[i].amount, stack_order: this.discountItems[i].stack_order});
        }
      }
      this.checkDiscounts();

      (<HTMLInputElement>document.getElementById('name')).placeholder = res[0].name ? res[0].name : res[0].id;
    }).catch(err => { this.errors = err; })
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
  fetchDiscount() {
    this._menuService.showDiscount()
      .then(response => {
        this.discountList = response['discountList'].sort((a,b) => 
          a.type.localeCompare(b.type)
        );
        const employees = this.discountList.filter(discountEmpployee => discountEmpployee.one_per_employee)
        for(let i in employees) {
          this._menuService.checkEmployeeDiscount(employees[i].id,this.userData.id).then((resp: {discountUsed: false}) => {
            this.employeeDiscount.push({id: employees[i].id, hasBeenUsed: resp.discountUsed})
          })
        }
      })
      .catch(err => this.errors = err);
  }

  toggle(btnId: any) {
    let divId = btnId.target.id;
    let element = document.getElementById(divId);
    if (divId == 'foodButton') {
      this.showFood = true;
      this.show = this.showMenu = this.showExtra = this.showDiscount = false;
      if(!element.classList.contains('selected')) {
        element.classList.add('selected');
      }
      let bButton = document.getElementById('beveragesButton');
      bButton.classList.remove("selected");
      document.getElementById('menuButton').classList.remove('selected')
      document.getElementById('extraButton').classList.remove('selected')
      document.getElementById('discountButton').classList.remove('selected')
    } else if (divId == 'beveragesButton') {
      this.show = true;
      this.showFood = this.showMenu = this.showExtra = this.showDiscount = false;
      if(!element.classList.contains('selected')) {
        element.classList.add('selected');
      }
      let bButton = document.getElementById('foodButton');
      bButton.classList.remove("selected");
      document.getElementById('menuButton').classList.remove('selected')
      document.getElementById('extraButton').classList.remove('selected')
      document.getElementById('discountButton').classList.remove('selected')
    } else if (divId == 'menuButton') {
      this.showMenu = true;
      this.showFood = this.show = this.showExtra = this.showDiscount = false;
      if(!element.classList.contains('selected')) {
        element.classList.add('selected');
      }
      let bButton = document.getElementById('foodButton');
      bButton.classList.remove("selected");
      document.getElementById('beveragesButton').classList.remove('selected')
      document.getElementById('extraButton').classList.remove('selected')
      document.getElementById('discountButton').classList.remove('selected')
    } else if (divId == 'extraButton') {
      this.showExtra = true;
      this.showFood = this.show = this.showMenu = this.showDiscount = false;
      if(!element.classList.contains('selected')) {
        element.classList.add('selected');
      }
      let bButton = document.getElementById('foodButton');
      bButton.classList.remove("selected");
      document.getElementById('beveragesButton').classList.remove('selected')
      document.getElementById('menuButton').classList.remove('selected')
      document.getElementById('discountButton').classList.remove('selected')
    } else {
      this.showDiscount = true;
      this.showFood = this.show = this.showMenu = this.showExtra = false;
      if(!element.classList.contains('selected')) {
        element.classList.add('selected');
      }
      let bButton = document.getElementById('foodButton');
      bButton.classList.remove("selected");
      document.getElementById('beveragesButton').classList.remove('selected')
      document.getElementById('menuButton').classList.remove('selected')
      document.getElementById('extraButton').classList.remove('selected')
    }
  }
  changeName() {
    if (this.orderForm.value.name != '') {
      this._orderService.updateOrder(this.orderId,{name: this.orderForm.value.name});
    }
    this._router.navigate(['comandas/index'])
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
    let foodElement = this.foodItem.find( item => item.id == food.id )
    if(typeof foodElement != 'undefined') {
      let index = this.foodItem.indexOf(foodElement);
      this.foodItem[index].FoodOrder.quantity = parseFloat(this.foodItem[index].FoodOrder.quantity) + 1;
      let foodData = { quantity: this.foodItem[index].FoodOrder.quantity };
      this._orderService.updateFoodOrder(this.foodItem[index].FoodOrder.id,foodData);
      this.itemsList.push({name: food.product,price: food.price, id: food.id,type: 'food'});
      this.totalAmount = this.totalAmount + food.price;
      this.checkDiscounts();
      this._orderService.updateOrder(this.orderId,{subtotal: this.amountDiscount});
    } else {
      let orderItems = {
        beverages: [],
        food: [{
          foodId: food.id,
          orderId: this.orderId,
          quantity: 1
        }],
        special: [],
        extra: [],
        discounts: []
      }
      this._orderService.saveOrderItems(orderItems).then((res) => {
        food.FoodOrder = res['newFood'];
        this.foodItem.push(food)
        this.itemsList.push({name: food.product,price: food.price, id: food.id,type: 'food'});
        this.totalAmount = this.totalAmount + food.price;
        this.checkDiscounts();
        this._orderService.updateOrder(this.orderId,{subtotal: this.amountDiscount});
      });
    }
  }
  addMenu(special) {
    let specialElement = this.menuItem.find( x => x.id == special.id )
    if(typeof specialElement != 'undefined'){
      let index = this.menuItem.indexOf(specialElement);
      this.menuItem[index].specialOrder.quantity = parseFloat(this.menuItem[index].specialOrder.quantity) + 1;
      let specialData = { quantity: this.menuItem[index].specialOrder.quantity };
      this._orderService.updateSpecialOrder(this.menuItem[index].specialOrder.id,specialData);
      this.itemsList.push({name: special.product + " (" + special.type + ")",price: special.price,id: special.id,type: 'special'});
      this.totalAmount = this.totalAmount + special.price;
      this.checkDiscounts();
      this._orderService.updateOrder(this.orderId,{subtotal: this.amountDiscount});
    } else {
      let orderItems = {
        beverages: [],
        food: [],
        special: [{
          specialId: special.id,
          orderId: this.orderId,
          quantity: 1
        }],
        extra: [],
        discounts: []
      }
      this._orderService.saveOrderItems(orderItems).then((res) => {
        special.specialOrder = res['newSpecial'];
        this.menuItem.push(special);
        this.itemsList.push({name: special.product + " (" + special.type + ")",price: special.price,id: special.id,type: 'special'});
        this.totalAmount = this.totalAmount + special.price;
        this.checkDiscounts();
        this._orderService.updateOrder(this.orderId,{subtotal: this.amountDiscount});
      });
    }
  }


  addExtra(extra) {
    let extraElement = this.extraItem.find(x => x.id == extra.id)
    if(typeof extraElement != 'undefined'){
      let index = this.extraItem.indexOf(extraElement);
      this.extraItem[index].extraOrder.quantity = parseFloat(this.extraItem[index].extraOrder.quantity) + 1;
      let extraData = { quantity: this.extraItem[index].extraOrder.quantity };
      this._orderService.updateExtraOrder(this.extraItem[index].extraOrder.id,extraData);
      this.itemsList.push({name: extra.product,price: extra.price,id:extra.id,type: 'extra'});
      this.totalAmount = this.totalAmount + extra.price;
      this.checkDiscounts();
      this._orderService.updateOrder(this.orderId,{subtotal: this.amountDiscount});
    } else {
      let orderItems = {
        beverages: [],
        food: [],
        special: [],
        extra: [{
          extraId: extra.id,
          orderId: this.orderId,
          quantity: 1
        }],
        discounts: []
      }
      this._orderService.saveOrderItems(orderItems).then((res) => {
        extra.extraOrder = res['newExtra'];
        this.extraItem.push(extra);
        this.itemsList.push({name: extra.product,price: extra.price});
        this.totalAmount = this.totalAmount + extra.price;
        this.checkDiscounts();
        this._orderService.updateOrder(this.orderId,{subtotal: this.amountDiscount})
      })
    }
  }
  addBeverage(name,price,b) {
    let beveragesElement = this.beveragesItem.find(x => x.id == b.id)
    if(typeof beveragesElement != 'undefined') {
      let index = this.beveragesItem.indexOf(beveragesElement);
      this.beveragesItem[index].BeveragesOrder.quantity = parseFloat(this.beveragesItem[index].BeveragesOrder.quantity) + 1;
      let beveragesData = { quantity: this.beveragesItem[index].BeveragesOrder.quantity };
      this._orderService.updateBeverageOrder(this.beveragesItem[index].BeveragesOrder.id,beveragesData).then(() => {
        this.itemsList.push({name: name,price: price,id: b.id,type: 'beverage'});
        this.hideSpecific();
        this.totalAmount = this.totalAmount + price;
        this.checkDiscounts();
        this._orderService.updateOrder(this.orderId,{subtotal: this.amountDiscount});
      })

    } else  {
      let orderItems = {
        beverages: [{
          beveragesId: b.id,
          orderId: this.orderId,
          quantity: 1
        }],
        food: [],
        special: [],
        extra: [],
        discounts: []
      }
      this._orderService.saveOrderItems(orderItems).then((res) => {
        b.BeveragesOrder = res['newBeverage']
        this.beveragesItem.push(b)
        this.itemsList.push({name: name,price: price});
        this.hideSpecific();
        this.totalAmount = this.totalAmount + price;
        this.checkDiscounts();
        this._orderService.updateOrder(this.orderId,{subtotal: this.amountDiscount});
      });
    }
  }
  addDiscount(discount) {
    let discountItem = this.discountItems.find(item => item.id == discount.id)
    let stack_order = this.discountItems.length ? this.discountItems.length + 1 : 1;
    let discountFromList = this.discountList.find(d => d.id == discount.id);
    if(typeof discountItem == 'undefined'){
      if(this.itemsList.length) {
        this.discountItems.push({id: discount.id,name: discount.name,type: discount.type, amount: discount.amount, stack_order: stack_order,
          discountOrder: {quantity: 1}});
          this.discountItemsList.push({id: discount.id,name: discount.name,type: discount.type, amount: discount.amount, stack_order: stack_order,
            quantity: 1});
        if (discount.type == 'percentage') {
          this.amountDiscount = Number((this.amountDiscount * ((100 - discount.amount)/100)).toFixed(2));
        } else {
          this.amountDiscount = Number((this.amountDiscount - discount.amount).toFixed(2));
        }
        this._orderService.updateOrder(this.orderId,{subtotal: this.amountDiscount});
        this._orderService.createDiscount({
          discountId: discount.id,
          orderId: this.orderId,
          stack_order: stack_order,
          quantity: 1
        })
      } else {
        this.confirm = false;
        this.showAlert2 = true;
        this.closeC = true;
      }
    } else {
      if(discountFromList.one_per_customer || discountFromList.one_per_employee) {
        this.confirm = false;
        this.showAlert = true;
        this.closeC = true;
      } else { 
        let index = this.discountItems.indexOf(discountItem)
        this.discountItems[index].discountOrder.quantity = this.discountItems[index].discountOrder.quantity + 1;
        this.discountItemsList.push({id: discount.id,name: discount.name,type: discount.type, amount: discount.amount, stack_order: stack_order,
          quantity: 1});
        if (discount.type == 'percentage') {
          this.amountDiscount = Number((this.amountDiscount * ((100 - discount.amount)/100)).toFixed(2));
        } else {
          this.amountDiscount = Number((this.amountDiscount - discount.amount).toFixed(2));
        }
        this._orderService.updateOrder(this.orderId,{subtotal: this.amountDiscount});
        this._orderService.updateDiscount(discountItem.discountOrder.id,{
          quantity: this.discountItems[index].discountOrder.quantity
        })
      }
    }
  }

  removeItem(item: any) {
    let index = this.itemsList.indexOf(item);
    this.totalAmount = this.totalAmount - item.price;
    this.checkDiscounts();
    this._orderService.updateOrder(this.orderId,{subtotal: this.amountDiscount});
    if (index > -1) {
      this.itemsList.splice(index,1);
    }
    if (item.type == 'beverage') {
      let element = this.beveragesItem.find( x => x.id == item.id)
      let index = this.beveragesItem.indexOf(element)
      let beverage = { quantity: parseFloat(this.beveragesItem[index].BeveragesOrder.quantity) - 1};
      this._spinnerService.show();
      this._orderService.updateBeverageOrder(this.beveragesItem[index].BeveragesOrder.id,beverage).then(() => {
        this.beveragesItem[index].BeveragesOrder.quantity = parseFloat(this.beveragesItem[index].BeveragesOrder.quantity) - 1;
      })
      this._spinnerService.hide();
    } else if (item.type == 'food') {
      let element = this.foodItem.find( x => x.id == item.id)
      let index = this.foodItem.indexOf(element)
      let foodData = { quantity: parseFloat(this.foodItem[index].FoodOrder.quantity) - 1};
      this._spinnerService.show();
      this._orderService.updateFoodOrder(this.foodItem[index].FoodOrder.id,foodData).then(() => {
        this.foodItem[index].FoodOrder.quantity = parseFloat(this.foodItem[index].FoodOrder.quantity) - 1;
      })
      this._spinnerService.hide();
    } else if (item.type == 'special') {
      let element = this.menuItem.find( x => x.id == item.id)
      let index = this.menuItem.indexOf(element)
      let special = { quantity: parseFloat(this.menuItem[index].specialOrder.quantity) - 1};
      this._spinnerService.show();
      this._orderService.updateSpecialOrder(this.menuItem[index].specialOrder.id,special).then(() => {
        this.menuItem[index].specialOrder.quantity = parseFloat(this.menuItem[index].specialOrder.quantity) - 1;
      })
      this._spinnerService.hide();
    } else if (item.type == 'extra') {
      let element = this.extraItem.find( x => x.id == item.id)
      let index = this.extraItem.indexOf(element)
      let extra = { quantity: parseFloat(this.extraItem[index].extraOrder.quantity) - 1};
      this._spinnerService.show();
      this._orderService.updateExtraOrder(this.extraItem[index].extraOrder.id,extra).then(() => {
        this.extraItem[index].extraOrder.quantity = parseFloat(this.extraItem[index].extraOrder.quantity) - 1;
      })
      this._spinnerService.hide();
    } 
  }
  removeDiscount(item) {
    let list = this.discountItems.filter( x => x.id == item.id )
    if(list[0].quantity == 1) {
      this.discountItems = this.discountItems.filter( x => x.id !== item.id );
      this.discountItemsList = this.discountItemsList.filter( x => x !== item);
      this._orderService.removeDiscount(item.id, this.orderId)
    } else {
      this.discountItemsList = this.discountItemsList.filter( x => x !== item);
      let discountItem = this.discountItems.find(item => item.id == item.id)
      let index = this.discountItems.indexOf(discountItem)
      this.discountItems[index].quantity = this.discountItems[index].quantity - 1;
      this._orderService.updateDiscount(discountItem.discountOder.id,{
        quantity: this.discountItems[index].quantity
      })
    }
    this.checkDiscounts();
    this._orderService.updateOrder(this.orderId,{subtotal: this.amountDiscount});
  }
  confirmClose() {
    this.closeC = !this.closeC;
    this.confirm = true;
    this.alert = false;
    if (this.orderForm.value.name != '') {
      this._orderService.updateOrder(this.orderId,{name: this.orderForm.value.name});
    }
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
  platform() {
    this.pago = false;
    this.plataforma = true;
  }
  public onChange(event: Event): void {
    this.paymentForm.get('change').setValue(parseFloat((<HTMLInputElement>event.target).value) - this.amountDiscount);
  }
  async saveSale(payMethod) {
    let saleData: any;
    let ingreso: any;
    if (this.paymentForm.value.amount == ''){
      ingreso = this.amountDiscount;
    } else {
      ingreso = this.paymentForm.value.amount;
    }
    if(payMethod == "card"){
      saleData = {
        pago: 'tarjeta',
        ingreso: this.amountDiscount,
        costo: this.amountDiscount,
        OrderId: this.orderId
      } 
    } else if (payMethod == "cash") {
      saleData = {
        pago: 'efectivo',
        ingreso: ingreso,
        costo: this.amountDiscount,
        OrderId: this.orderId
      } 
    } else if (payMethod == "platform") {
      saleData = {
        pago: 'plataforma',
        ingreso: this.platformGain.value.gain,
        costo: this.platformGain.value.gain,
        OrderId: this.orderId,
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
  checkDiscounts() {
    if(this.discountItems.length) {
      let stack_order = 1;
      this.amountDiscount = this.totalAmount;
      this.discountItemsList.forEach( discount => {
        discount.stack_order = stack_order;
        this._orderService.updateDiscount(discount.id,{
          stack_order: stack_order
        })
        if (discount.type == 'percentage') {
          this.amountDiscount = Number((this.amountDiscount * ((100 - discount.amount)/100)).toFixed(2));
        } else {
          this.amountDiscount = Number((this.amountDiscount - discount.amount).toFixed(2));
        }
        stack_order++;
      })
    } else {
      this.amountDiscount = this.totalAmount;
    }
  }
  checkEmployee(id) {
    let used = this.employeeDiscount.filter(discount => discount.id == id);
    if(used[0]) {
      return !used[0].hasBeenUsed
    } else {
      return true
    }
  }

}
