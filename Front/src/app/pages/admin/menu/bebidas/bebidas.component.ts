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
  public beverageId: any;

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
      size: new FormControl('', [
        Validators.required
      ]),
      milk: new FormControl('',[
      ]),
      price: new FormControl('',[
        Validators.required
      ]),
      beverageId: new FormControl('',[
      ])
    })
  }

  showBeverages () {
    $('#options').hide();
    $('#eliminar').show();
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
      size: this.addBeverageSpecific.value.size,
      milk: this.addBeverageSpecific.value.milk,
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

}
