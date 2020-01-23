import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { MenuService } from 'src/app/services/menu.service';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';


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
  public foodListSearch = [];
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
  public title: any
  public add = true;
  public update = false;
  public addSpecific = false;
  public seeSpecific = false;
  public updateSpecificBeverages = false;
  faArrowLeft = faArrowLeft;
  faTrashAlt = faTrashAlt;
  faEdit = faEdit;
  faSearch = faSearch;
  faEye = faEye;
  faTimesCircle = faTimesCircle;
  faPlus = faPlus;

  constructor(
    private _store: Store<AppState>,
    private _menuService: MenuService,
    private _spinnerService: Ng4LoadingSpinnerService
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
        this.foodListSearch = this.beveragesList.slice();
      })
      .catch(err => {
        this.errors = err;
      })
  }
  hide() {
    this.addSpecific = false;
    this.seeSpecific = false;
    this.updateSpecificBeverages = false;
  }
  showList(name: any) {
    this.seeSpecific = true;
    this.title = name.product;
    this.beverageParentId = name.id;
    this.beverageId = name.id;
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
        this.title = response["newBeverage"].product;
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
        this.addBeverage.reset();
      })
      .catch(err => {
        this.errors = err;
      })
  }
  addS() {
    this.addSpecific = true;
    this.seeSpecific = false;
  }
  editS() {
    this.addSpecific = false;
    this.seeSpecific = true;
  }
  deleteBeverage(beverageId: any) {
    const disableBeverage = {
      status: 'disabled'
    }
    this._menuService.updateBeverage(disableBeverage,beverageId)
      .then(response => {
        this.beverages();
      })
  }
  editThisField(beverageId: any) {
    this.updateVarGeneral = beverageId; 
    this.add = false;
    this.update = true;
  }
  updateBeverageGeneral() {
    const newInfo = {
      product: this.updateGeneral.value.productName
    }
    this._menuService.updateBeverage(newInfo,this.updateVarGeneral)
      .then(response => {
        this.update = false;
        this.add = true;
      })
  }
  cancel() {
    this.update = false;
    this.add = true;
  }
  deleteSpecificBeverage(id: any) {
    const disableSpecific = {
      status: 'disabled'
    }
    this._menuService.updateBeverageSpecific(disableSpecific,id)
      .then(response => {
        this.showBeveragesSpecific(this.beverageParentId);
      })
  }
  editThisSpecific(b: any){
    this.updateSpecificBeverages = true;
    this.editId = b.id;
    this.editData = {
      type: b.type,
      price: b.price
    };
    this.updateSpecific.controls['typeUpdate'].setValue(b.type);
    this.updateSpecific.controls['priceUpdate'].setValue(b.price);
  }
  async updateBeverageSpecific() {
    const newInfo = {
      type: this.updateSpecific.value.typeUpdate,
      price: this.updateSpecific.value.priceUpdate,
      beverageId: this.beverageParentId
    }
    const disableSpecific = {
      status: 'disabled'
    }
    this._spinnerService.show();
    await this._menuService.updateBeverageSpecific(disableSpecific,this.editId)
      .then(response => {
        this.updateSpecificBeverages = false;
      })
      .catch(err => {
        this.errors = err;
      })
    await this._menuService.newSpecificBeverage(newInfo)
        .then(response => {
          this.showBeveragesSpecific(this.beverageParentId);
        })
        .catch(err => {
          this.errors = err;
        })
        this._spinnerService.hide();
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

  public onChange(event: Event): void {
    let word = (<HTMLInputElement>event.target).value;
    let _self = this;
    _self.foodListSearch = [];
    if(word == '') {
      _self.foodListSearch = this.beveragesList.slice();
    } else {
      this.beveragesList.find(function(item) {
        if(item.product.includes(word)) {
          _self.foodListSearch.push(item);
        }
      })
    }
  }


}
