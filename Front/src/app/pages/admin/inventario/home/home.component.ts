import { Component, OnInit } from '@angular/core';
import { StockService } from 'src/app/services/stock.service'
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

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
    private _stockService: StockService
  ) { }

  ngOnInit() {
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
      console.log(this.insumosList);
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
        this.showAlert()
        this.createInsumo.reset();
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

  async showAlert() {
    let alert = document.getElementById('alertM');
    alert.classList.remove('alertMessageNone');
    alert.classList.add('alertMessage');
    alert.classList.add('fadeInBottom');
    await this.delay(1000);
    alert.classList.remove('alertMessage');
    alert.classList.remove('fadeInBottom');
    alert.classList.add('fadeOut');
    alert.classList.add('alertMessageNone');
  }
  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

}
