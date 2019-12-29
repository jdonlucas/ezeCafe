import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { MenuService } from 'src/app/services/menu.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faEdit } from '@fortawesome/free-regular-svg-icons';

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
    private _menuService: MenuService) { }

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
  updateMenu() {
    const newMenuData = {
      product: this.editMenu.value.productEdit,
      price: this.editMenu.value.priceEdit,
      type: this.editMenu.value.typeEdit
    }
    this._menuService.updateSpecial(newMenuData,this.parentId)
      .then(response => {
        this.showMenu();
        this.editMenu.reset();
        this.searchMenu.reset();
        this.add = true;
        this.editM = false;
      })
  }
  deleteMenu(id: any) {
    this._menuService.deleteSpecial(id)
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
