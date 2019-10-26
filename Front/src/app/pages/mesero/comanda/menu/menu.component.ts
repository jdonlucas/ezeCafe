import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public orderData: any;

  constructor(
    private _store: Store<AppState>,) { }

  ngOnInit() {
    this._store.select('comanda').subscribe(comanda => {
      let comandaData = comanda.comandaData ? comanda.comandaData : {};
      this.orderData = comandaData.id ? comandaData.id : {};
    });
  }
  

}
