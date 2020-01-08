import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { MenuService } from 'src/app/services/menu.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-especial',
  templateUrl: './especial.component.html',
  styleUrls: ['./especial.component.css']
})
export class EspecialComponent implements OnInit {

  public userData: any;
  public menuList: any;
  public menuListSearch: any;
  public addMenu: FormGroup;
  public editMenu: FormGroup;
  public searchMenu: FormGroup;
  public parentId: any;
  public add = true;
  public editM = false;
  faArrowLeft = faArrowLeft;
  faTrashAlt = faTrashAlt;
  faEdit = faEdit;
  faSearch = faSearch;

  constructor(
    private _store: Store<AppState>,
    private _menuService: MenuService,
    private _spinnerService: Ng4LoadingSpinnerService) { }

  ngOnInit() {
    this._store.select('auth').subscribe(auth => {
      let authData = auth.authData ? auth.authData : {};
      this.userData = authData.user ? authData.user : {};
    });
    this.searchMenu = new FormGroup({
      filter: new FormControl('',[
      ])
    });
    this.addMenu = new FormGroup({
      product: new FormControl('',[
        Validators.required
      ]),
      price: new FormControl('',[
        Validators.required
      ]),
      type: new FormControl('',[
        Validators.required
      ])
    });
    this.editMenu = new FormGroup({
      productEdit: new FormControl('',[
        Validators.required
      ]),
      priceEdit: new FormControl('',[
        Validators.required
      ]),
      typeEdit: new FormControl('',[
        Validators.required
      ])
    })
    this.showMenu();
  }

  showMenu() {
    this._menuService.showSpecial()
      .then(response => {
        this.menuList = response['specialList'];
        this.menuListSearch = this.menuList.slice()
      })
  }
  addNewMenu(){
    const menuData = {
      product: this.addMenu.value.product,
      price: this.addMenu.value.price,
      type: this.addMenu.value.type
    }
    this._menuService.addSpecial(menuData)
      .then(response => {
        this.addMenu.reset();
        this.showMenu();
      })
  }
  edit(id: any,product: any,price: any,type: any) {
    this.add = false;
    this.editM = true;
    this.parentId = id;
    this.editMenu.controls['productEdit'].setValue(product);
    this.editMenu.controls['priceEdit'].setValue(price);
    this.editMenu.controls['typeEdit'].setValue(type);
  }
  async updateMenu() {
    const newMenuData = {
      product: this.editMenu.value.productEdit,
      price: this.editMenu.value.priceEdit,
      type: this.editMenu.value.typeEdit
    }
    const disableMenu = {
      status: 'disabled'
    }
    this._spinnerService.show();
    await this._menuService.updateSpecial(disableMenu,this.parentId)
      .then(response => {
        this.editMenu.reset();
        this.searchMenu.reset();
        this.add = true;
        this.editM = false;
      })
    await this._menuService.addSpecial(newMenuData)
      .then(response => {
        this.showMenu();
      })
    this._spinnerService.hide();
  }
  deleteMenu(id: any) {
    const disableMenu = {
      status: 'disabled'
    }
    this._menuService.updateBeverageSpecific(disableMenu,id)
      .then(response => {
        this.showMenu();
      })
  }
  public onChange(event: Event): void {
    let word = (<HTMLInputElement>event.target).value;
    let _self = this;
    _self.menuListSearch = [];
    if(word == '') {
      _self.menuListSearch = this.menuList.slice();
    } else {
      this.menuList.find(function(item) {
        if(item.product.includes(word)) {
          _self.menuListSearch.push(item);
        }
      })
    }
  }

}
