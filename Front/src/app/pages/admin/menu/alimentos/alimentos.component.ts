import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { MenuService } from 'src/app/services/menu.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-alimentos',
  templateUrl: './alimentos.component.html',
  styleUrls: ['./alimentos.component.css']
})
export class AlimentosComponent implements OnInit {

  public userData: any;
  public foodList: any;
  public foodListSearch: any;
  public addFood: FormGroup;
  public editFood: FormGroup;
  public searchFood: FormGroup;
  public parentId: any;
  public add = true;
  public editF = false;
  faArrowLeft = faArrowLeft;
  faTrashAlt = faTrashAlt;
  faEdit = faEdit;
  faSearch = faSearch;

  constructor(
    private _store: Store<AppState>,
    private _menuService: MenuService,
    private _spinnerService: NgxSpinnerService) { }

  ngOnInit() {
    this._store.select('auth').subscribe(auth => {
      let authData = auth.authData ? auth.authData : {};
      this.userData = authData.user ? authData.user : {};
    });
    this.searchFood = new FormGroup({
      filter: new FormControl('',[
      ])
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
        this.foodListSearch = this.foodList.slice()
      })
  }
  addNewFood(){
    const foodData = {
      product: this.addFood.value.product,
      price: this.addFood.value.price
    }
    this._menuService.addFood(foodData)
      .then(response => {
        this.addFood.reset();
        this.showFood();
      })
  }
  edit(id: any,product: any,price: any) {
    this.add = false;
    this.editF = true;
    this.parentId = id;
    this.editFood.controls['productEdit'].setValue(product);
    this.editFood.controls['priceEdit'].setValue(price);
  }
  async updateFood() {
    const newFoodData = {
      product: this.editFood.value.productEdit,
      price: this.editFood.value.priceEdit
    }
    const disableFood = {
      status: 'disabled'
    }
    this._spinnerService.show();
    await this._menuService.updateFood(disableFood,this.parentId)
      .then(response => {
        this.editFood.reset();
        this.searchFood.reset();
        this.add = true;
        this.editF = false;
      })
    await this._menuService.addFood(newFoodData)
    .then(response => {
      this.showFood();
    })
    this._spinnerService.hide();
  }
  deleteFood(id: any) {
    const disableFood = {
      status: 'disabled'
    }
    this._menuService.updateFood(disableFood,id)
      .then(response => {
        this.showFood();
      })
  }
  public onChange(event: Event): void {
    let word = (<HTMLInputElement>event.target).value;
    let _self = this;
    _self.foodListSearch = [];
    if(word == '') {
      _self.foodListSearch = this.foodList.slice();
    } else {
      this.foodList.find(function(item) {
        if(item.product.includes(word)) {
          _self.foodListSearch.push(item);
        }
      })
    }
  }

}
