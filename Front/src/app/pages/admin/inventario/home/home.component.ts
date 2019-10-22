import { Component, OnInit } from '@angular/core';
import { StockService } from 'src/app/services/stock.service'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from 'src/app/services/auth.service';

import { DatePipe } from '@angular/common';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public today: any;
  public userData: any;
  public createInsumo: FormGroup;
  public createDesposable: FormGroup;
  public updateDesposable: FormGroup;
  public insumosList: any;
  public desposablesList: any;
  public errorCode: any;
  public newInsumo: any;
  public newDesposable: any;
  public showAddInsumo: boolean;
  public showHome: boolean;
  public showListInsumo: boolean;
  public showDeleteInsumo: boolean;
  public showDesposableList: boolean;
  public showDesposableDelete: boolean;
  public showAddDesposable: boolean;
  public click: number = 0;
  public productName: any;
  public productId: any;
  public realQuantity: any;

  constructor(
    private datePipe: DatePipe,
    private _stockService: StockService,
    private _store: Store<AppState>,
    private _authService: AuthService
  ) { }

  ngOnInit() {
    this.today = this.datePipe.transform(new Date(),'yyyy-MM-dd');
    this._store.select('auth').subscribe(auth => {
      let authData = auth.authData ? auth.authData : {};
      this.userData = authData.user ? authData.user : {};
    });
    this.showHome = true;
    this.createInsumo = new FormGroup ({
      product: new FormControl('', [
        Validators.required
      ]),
      description: new FormControl('', [
      ]),
      quantity: new FormControl('', [
        Validators.required
      ])
    });
    this.createDesposable = new FormGroup ({
      product: new FormControl('', [
        Validators.required
      ]),
      quantity: new FormControl('', [

      ])
    })
    this.updateDesposable = new FormGroup({
      productQuantity: new FormControl('', [
        Validators.required
      ])
    })
  }

  fetchInsumos() {
    this._stockService.showInsumos().then(response => {
      this.insumosList = response["insumosList"];
    }).catch(err => {
      this.errorCode = err.error;
    })
  }
  addInsumo() {
    const newInsumoData: any = {
      product: this.createInsumo.value.product,
      description: this.createInsumo.value.description,
      quantity: this.createInsumo.value.quantity
    }
    this._stockService.addInsumo(newInsumoData)
      .then(response => {
        this.newInsumo = response;
        this.createInsumo.reset();
        $('#alertM p').html('Se agregó insumo al inventario.');
        $('#alertM').show();
        $('#alertM').fadeOut(4000);
      })
      .catch(err => {
        this.errorCode = err.error;
      })
  }
  deleteInsumo(id: any) {
    this._stockService.deleteIsumo(id)
      .then(response => {
        $('#alertM p').html('Se eliminó el insumo del inventario.');
        this.fetchInsumos();
        $('#alertM').show();
        $('#alertM').fadeOut(4000);
      })
      .catch(err => {
        this.errorCode = err.error;
      })
  }

  fetchDesposables() {
    this._stockService.showDesposable().then(response => {
      this.desposablesList = response["stockList"];
    }).catch(err => {
      this.errorCode = err.error;
    })
  }
  addDesposable() {
    const newDesposableData: any = {
      product: this.createDesposable.value.product,
      quantity: this.createDesposable.value.quantity
    }
    this._stockService.addDesposable(newDesposableData)
      .then(response => {
        this.newDesposable = response;
        this.createDesposable.reset();
        $('#alertM p').html('Se agregó el elemento al inventario.');
        $('#alertM').show();
        $('#alertM').fadeOut(4000);
      })
      .catch(err => {
        this.errorCode = err.error;
      })
  }
  deleteDesposable(id: any) {
    this._stockService.deleteDesposable(id)
      .then(response => {
        $('#alertM p').html('Se eliminó el elemento del inventario.');
        this.fetchDesposables();
        $('#alertM').show();
        $('#alertM').fadeOut(4000);
      })
      .catch(err => {
        this.errorCode = err.error;
      })
  }
  editDesposable(id: any, quantity: any) {
    $('#editD').show();
    if(this.click == 0) {
      this.productId = id;
      this.realQuantity = quantity;
    }
    this.click++;
    if(this.click > 1) {
      this.realQuantity = this.realQuantity + parseFloat(this.updateDesposable.value.productQuantity);
      this._stockService.modifyDesposable({quantity: this.realQuantity},this.productId)
        .then(response => {
          this.fetchDesposables();
        })
        .catch(err => {
          this.errorCode = err.error;
        })
      $('#editD').hide();
      this.click = 0;
      this.updateDesposable.reset();
    }
  }

  toggle(showDiv) {
    this.showAddInsumo = this.showDeleteInsumo = 
    this.showDesposableList = this.showAddDesposable
    = this.showDesposableDelete = this.showHome = 
    this.showListInsumo = false;
    if (showDiv == 'showAddInsumo') {
      this.showAddInsumo = true;
    } else if (showDiv == 'showDeleteInsumo') {
      this.showDeleteInsumo = true;
    } else if (showDiv == 'showHome') {
      this.showHome = true;
    } else if (showDiv == 'showListInsumo') {
      console.log(showDiv);
      this.showListInsumo = true;
    } else if (showDiv == 'showDesposableList') {
      this.showDesposableList = true;
    } else if (showDiv == 'showDesposableDelete') {
      this.showDesposableDelete = true;
    } else if (showDiv == 'showAddDesposable') {
      this.showAddDesposable = true;
    }
  }

  compareDates(date) {
    date = this.datePipe.transform(date, 'yyyy-MM-dd');
    return date == this.today;
  }

}
