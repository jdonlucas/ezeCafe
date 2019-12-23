import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { MenuService } from 'src/app/services/menu.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

declare var $: any;

@Component({
  selector: 'app-alimentos',
  templateUrl: './alimentos.component.html',
  styleUrls: ['./alimentos.component.css']
})
export class AlimentosComponent implements OnInit {

  public userData: any;
  public foodList: any;
  public addFood: FormGroup;
  public editFood: FormGroup;
  public parentId: any;
  faArrowLeft = faArrowLeft;

  constructor(
    private _store: Store<AppState>,
    private _menuService: MenuService) { }

  ngOnInit() {
    this._store.select('auth').subscribe(auth => {
      let authData = auth.authData ? auth.authData : {};
      this.userData = authData.user ? authData.user : {};
    });
    this.addFood = new FormGroup({
      product: new FormControl('',[
        Validators.required
      ]),
      price: new FormControl('',[
        Validators.required
      ])
    });
    this.editFood = new FormGroup({
      productEdit: new FormControl('',[
        Validators.required
      ]),
      priceEdit: new FormControl('',[
        Validators.required
      ])
    })
    this.showFood();
  }

  showFood() {
    this._menuService.showFood()
      .then(response => {
        this.foodList = response['foodList'];
      })
  }
  addNewFood(){
    const foodData = {
      product: this.addFood.value.product,
      price: this.addFood.value.price
    }
    this._menuService.addFood(foodData)
      .then(response => {
        $('#alertM').html('Se creó nuevo alimento.')
        $('#alertM').show();
        $('#alertM').fadeOut(5000);
        this.addFood.reset();
      })
  }
  edit(id: any,product: any,price: any) {
    this.parentId = id;
    $('#editFood').show();
    this.editFood.controls['productEdit'].setValue(product);
    this.editFood.controls['priceEdit'].setValue(price);
  }
  updateFood() {
    const newFoodData = {
      product: this.editFood.value.product,
      price: this.editFood.value.price
    }
    this._menuService.updateFood(newFoodData,this.parentId)
      .then(response => {
        $('#editFood').hide();
        this.showFood();
        this.editFood.reset();
      })
  }
  deleteFood(id: any) {
    this._menuService.deleteFood(id)
      .then(response => {
        this.showFood();
      })
  }

}
