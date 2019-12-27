import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { MenuService } from 'src/app/services/menu.service';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons';


declare var $: any;

@Component({
  selector: 'app-bebidas',
  templateUrl: './bebidas.component.html',
  styleUrls: ['./bebidas.component.css']
})
export class BebidasComponent implements OnInit {

  public userData: any;
  public beveragesList = [];
  public beveragesSpecificList = [];
  public errors: any;
  public addBeverage: FormGroup;
  public addBeverageSpecific: FormGroup;
  public updateGeneral: FormGroup;
  public updateSpecific: FormGroup;
  public createPrice: FormGroup;
  public searchFood: FormGroup;
  public beverageId: any;
  public updateVarGeneral: any;
  public beverageParentId: any;
  public editId: any;
  public editData: any;
  public add = true;
  public update = false;
  public addSpecific = false;
  public seeSpecific = false;
  faArrowLeft = faArrowLeft;
  faTrashAlt = faTrashAlt;
  faEdit = faEdit;
  faSearch = faSearch;
  faEye = faEye;
  faTimesCircle = faTimesCircle;

  constructor(
    private _store: Store<AppState>,
    private _menuService: MenuService
  ) { }

  ngOnInit() {
    this._store.select('auth').subscribe(auth => {
      let authData = auth.authData ? auth.authData : {};
      this.userData = authData.user ? authData.user : {};
    });
    this.addBeverage = new FormGroup({
      product: new FormControl('', [
        Validators.required
      ])
    });
    this.searchFood = new FormGroup({
      filter: new FormControl('',[
      ])
    });
    this.addBeverageSpecific = new FormGroup({
      type: new FormControl('', [
        Validators.required
      ]),
      price: new FormControl('',[
        Validators.required
      ]),
      beverageId: new FormControl('',[
      ])
    });
    this.updateGeneral = new FormGroup({
      productName: new FormControl('',[
        Validators.required
      ])
    });
    this.updateSpecific = new FormGroup({
      typeUpdate: new FormControl('',[
      ]),
      priceUpdate: new FormControl('',[
      ])
    })
    this.createPrice = new FormGroup({
      typeCreate: new FormControl('', [
        Validators.required
      ]),
      priceCreate: new FormControl('',[
        Validators.required
      ])
    })
    this.beverages();
  }
  beverages(){
    this._menuService.showBeverages()
      .then(response => {
        this.beveragesList = response['menuBeverages'];
      })
      .catch(err => {
        this.errors = err;
      })
  }
  hide() {
    this.addSpecific = false;
    this.seeSpecific = false;
  }
  showBeveragesSpecific (id: any) {
    this._menuService.showSpecificBeverage(id)
      .then(response => {
        this.beveragesSpecificList = response['menuBeveragesSpecific'];
      })
      .catch(err => {
        this.errors = err;
      })
  }
  addNewBeverage(){
    this._menuService.newBeverage({ product: this.addBeverage.value.product })
      .then(response => {
        this.beverageId = response["newBeverage"].id;
        this.addSpecific = true;
        this.showBeveragesSpecific(this.beverageId);
      })
      .catch(err => {
        this.errors = err;
      })
  }
  addNewBeverageSpecific(beverageId: any){
    let specificData = {
      type: this.addBeverageSpecific.value.type,
      price: this.addBeverageSpecific.value.price,
      beverageId: beverageId
    }
    this._menuService.newSpecificBeverage(specificData)
      .then(response => {
        this.showBeveragesSpecific(beverageId);
        this.addBeverageSpecific.reset();
        this.beverages();
      })
      .catch(err => {
        this.errors = err;
      })
  }
  deleteBeverage(beverageId: any) {
    this._menuService.deleteBeverage(beverageId)
      .then(response => {
        this.beverages();
      })
  }
  editThisField(beverageId: any) {
    $('#uGeneral').show();
    this.updateVarGeneral = beverageId; 
  }
  updateBeverageGeneral() {
    const newInfo = {
      product: this.updateGeneral.value.productName
    }
    this._menuService.updateBeverage(newInfo,this.updateVarGeneral)
      .then(response => {
      })
  }
  deleteSpecificBeverage(id: any) {
    this._menuService.deleteBeverageSpecific(id)
      .then(response => {
        console.log(response);
        this.showBeveragesSpecific(this.beverageParentId);
      })
  }
  editThisSpecific(id: any, type: any, price: any){
    this.editId = id;
    this.editData = {
      type: type,
      price: price
    };
    this.updateSpecific.controls['typeUpdate'].setValue(type);
    this.updateSpecific.controls['priceUpdate'].setValue(price);
  }
  updateBeverageSpecific() {
    const newInfo = {
      type: this.updateSpecific.value.typeUpdate,
      price: this.updateSpecific.value.priceUpdate
    }
    this._menuService.updateBeverageSpecific(newInfo,this.editId)
      .then(response => {
        this.showBeveragesSpecific(this.beverageParentId);
      })
      .catch(err => {
        this.errors = err;
      })
  }
  createNewBeverageSpecific() {
    const beverageData = {
      type: this.createPrice.value.typeCreate,
      price: this.createPrice.value.priceCreate,
      beverageId: this.beverageParentId
    }
    this._menuService.newSpecificBeverage(beverageData)
      .then(response => {
        $('#createPrice').hide();
        this.showBeveragesSpecific(this.beverageParentId);
      })
  }


}
