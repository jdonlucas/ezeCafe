import { Component, OnInit } from '@angular/core';
import { StockService } from 'src/app/services/stock.service'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from 'src/app/services/auth.service';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public userData: any;
  public createInsumo: FormGroup;
  public insumosList: any;
  public desposablesList: any;
  public errorCode: any;
  public newInsumo: any;
  public showAddInsumo: boolean;
  public showHome: boolean;
  public showListInsumo: boolean;
  public showDeleteInsumo: boolean;

  constructor(
    private _stockService: StockService,
    private _store: Store<AppState>,
    private _authService: AuthService
  ) { }

  ngOnInit() {
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
        console.log(response);
        $('#alertM p').html('Se eliminó el insumo del inventario.');
        this.fetchInsumos();
        $('#alertM').show();
        $('#alertM').fadeOut(4000);
      })
      .catch(err => {
        this.errorCode = err.error;
      })
  }

  toggle(showDiv) {
    this.showAddInsumo = this.showDeleteInsumo = 
    this.showHome = this.showListInsumo = false;
    if (showDiv == 'showAddInsumo') {
      this.showAddInsumo = true;
    } else if (showDiv == 'showDeleteInsumo') {
      this.showDeleteInsumo = true;
    } else if (showDiv == 'showHome') {
      this.showHome = true;
    } else if (showDiv == 'showListInsumo') {
      console.log(showDiv);
      this.showListInsumo = true;
    }
  }

}
