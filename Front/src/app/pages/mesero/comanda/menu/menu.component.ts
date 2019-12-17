import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MenuService } from 'src/app/services/menu.service';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public orderData: any;
  public orderForm: FormGroup;
  public foodList: any;
  public beveragesList: any;
  public beveragesSpecificList: any;
  public errors: any
  public show = true;
  public showSpecific = false;
  public itemsList = [];
  public totalAmount: number;
  public showConfirm = false;
  faTrash = faTrashAlt;

  constructor(
    private _menuService: MenuService,
    ) { }

  ngOnInit() {
    this.orderForm = new FormGroup ({
      name: new FormControl('',[])
    })
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
  }
  addBeverage(name,price) {
    this.itemsList.push({name: name,price: price});
    this.hideSpecific();
    this.totalAmount = this.totalAmount + price;
  }
  addFood(name,price) {
    this.itemsList.push({name: name,price: price});
    this.totalAmount = this.totalAmount + price;
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

}
