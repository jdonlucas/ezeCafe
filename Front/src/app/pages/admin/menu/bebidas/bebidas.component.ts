import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { MenuService } from 'src/app/services/menu.service';

declare var $: any;

@Component({
  selector: 'app-bebidas',
  templateUrl: './bebidas.component.html',
  styleUrls: ['./bebidas.component.css']
})
export class BebidasComponent implements OnInit {

  public userData: any;
  public beveragesList: any;
  public beveragesSpecificList: any;
  public errors: any;
  public addBeverage: FormGroup;
  public addBeverageSpecific: FormGroup;
  public updateGeneral: FormGroup;
  public updateSpecific: FormGroup;
  public createPrice: FormGroup;
  public beverageId: any;
  public title: string;
  public updateVarGeneral: any;
  public beverageParentId: any;
  public editId: any;
  public editData: any;

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
  }

  showBeverages (option: any) {
    if (option == 1){
      $('#options').hide();
      $('#mostrar').show();
    } else if (option == 2) {
      $('#options').hide();
      $('#delete').show();
    } else if (option == 3) {
      $('#options').hide();
      $('#update').show();
    }
    this._menuService.showBeverages()
      .then(response => {
        this.beveragesList = response['menuBeverages'];
      })
      .catch(err => {
        this.errors = err;
      })
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
  show(num: any) {
    if(num == 1) {
      $('#options').hide();
      $('#add').show();
    } else if (num == 2) {
      $('#addPrices').hide();
      $('#addBeverage').show();
      this.addBeverage.reset();
    } else if (num == 3) {
      $('#showSpecificBeveragesList').hide();
      $('#showGeneralBeverages').show();
    } else if (num == 4) {
      $('#deleteSpecificBeverages').hide();
      $('#deleteGeneralbeverages').show();
    } else if (num == 5) {
      $('#updateSpecificBeverages').hide();
      $('#updateGeneralbeverages').show();
    } else if (num == 6){
      $('#createPrice').show();
    }
  }

  addNewBeverage(){
    this._menuService.newBeverage({ product: this.addBeverage.value.product })
      .then(response => {
        this.beverageId = response["newBeverage"].id;
        $('#addBeverage').hide();
        $('#addPrices').show();
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
      })
      .catch(err => {
        this.errors = err;
      })
  }
  pushTitle(titleProduct: any, num: any,id: any){
    this.title = titleProduct;
    if (num == 1) {
      $('#showGeneralbeverages').hide();
      $('#showSpecificBeveragesList').show();
    } else if (num == 2) {
      this.beverageParentId = id;
      $('#deleteGeneralbeverages').hide();
      $('#deleteSpecificBeverages').show();
    } else if (num == 3) {
      this.beverageParentId = id;
      $('#updateGeneralbeverages').hide();
      $('#updateSpecificBeverages').show();
    }
  }
  deleteBeverage(beverageId: any) {
    this._menuService.deleteBeverage(beverageId)
      .then(response => {
        this.showBeverages(4);
        $('#alertM p').html('Se eliminó la bebida.');
        $('#alertM').show();
        $('#alertM').fadeOut(4000);
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
        $('#uGeneral').hide();
        this.showBeverages(4);
      })
  }
  deleteSpecificBeverage(id: any) {
    this._menuService.deleteBeverageSpecific(id)
      .then(response => {
        console.log(response);
        this.showBeveragesSpecific(this.beverageParentId);
        $('#alertM p').html('Se eliminó la bebida.');
        $('#alertM').show();
        $('#alertM').fadeOut(4000);
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
    $('#uSpecific').show();
  }
  updateBeverageSpecific() {
    const newInfo = {
      type: this.updateSpecific.value.typeUpdate,
      price: this.updateSpecific.value.priceUpdate
    }
    this._menuService.updateBeverageSpecific(newInfo,this.editId)
      .then(response => {
        $('#uSpecific').hide();
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
