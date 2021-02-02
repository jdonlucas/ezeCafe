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
import { CommentStmt } from '@angular/compiler';

@Component({
  selector: 'app-discounts',
  templateUrl: './discounts.component.html',
  styleUrls: ['./discounts.component.css']
})
export class DiscountsComponent implements OnInit {

  public userData: any;
  public discountList: any;
  public discountListSearch: any;
  public addDiscount: FormGroup;
  public editDiscount: FormGroup;
  public searchDiscount: FormGroup;
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
    private _spinnerService: NgxSpinnerService) { }

    ngOnInit(): void {
      this._store.select('auth').subscribe(auth => {
        let authData = auth.authData ? auth.authData : {};
        this.userData = authData.user ? authData.user : {};
      });
      this.searchDiscount = new FormGroup({
        filter: new FormControl('',[
        ])
      });
      this.addDiscount = new FormGroup({
        name: new FormControl('',[
          Validators.required
        ]),
        type: new FormControl('',[
          Validators.required
        ]),
        amount: new FormControl('',[
          Validators.required
        ]),
        onePerCustomer: new FormControl(false,[
          Validators.required
        ]),
        onePerEmployee: new FormControl(false,[
          Validators.required
        ])
      });
      this.editDiscount = new FormGroup({
        nameEdit: new FormControl('',[
          Validators.required
        ]),
        typeEdit: new FormControl('',[
          Validators.required
        ]),
        amountEdit: new FormControl('',[
          Validators.required
        ]),
        onePerCustomerEdit: new FormControl(false,[
          Validators.required
        ]),
        onePerEmployeeEdit: new FormControl(false,[
          Validators.required
        ])
      })
      this.showDiscount();
    }

    showDiscount() {
      this._menuService.showDiscount()
        .then(response => {
          this.discountList = response['discountList'];
          this.discountListSearch = this.discountList.slice()
        })
    }
    addNewDiscount(){
      const discountData = {
        name: this.addDiscount.value.name,
        type: this.addDiscount.value.type,
        amount: this.addDiscount.value.amount,
        one_per_customer: this.addDiscount.value.onePerCustomer,
        one_per_employee: this.addDiscount.value.onePerEmployee
      }
      this._menuService.addDiscount(discountData)
        .then(response => {
          this.addDiscount.reset();
          this.showDiscount();
        })
    }
    edit(id: any,name: any,type: any,amount: any,onePerCustomer: any,onePerEmployee: any) {
      this.add = false;
      this.editM = true;
      this.parentId = id;
      this.editDiscount.controls['nameEdit'].setValue(name);
      this.editDiscount.controls['typeEdit'].setValue(type);
      this.editDiscount.controls['amountEdit'].setValue(amount);
      this.editDiscount.controls['onePerCustomerEdit'].setValue(onePerCustomer);
      this.editDiscount.controls['onePerEmployeeEdit'].setValue(onePerEmployee);
    }
    async updateDiscount() {
      const newDiscountData = {
        name: this.editDiscount.value.nameEdit,
        type: this.editDiscount.value.typeEdit,
        amount: this.editDiscount.value.amountEdit,
        one_per_customer: this.editDiscount.value.onePerCustomerEdit,
        one_per_employee: this.editDiscount.value.onePerEmployeeEdit
      }
      this._spinnerService.show();
      await this._menuService.updateDiscount(newDiscountData,this.parentId)
        .then(response => {
          this.editDiscount.reset();
          this.searchDiscount.reset();
          this.add = true;
          this.editM = false;
          this.showDiscount();
        })
      this._spinnerService.hide();
    }
    deleteDiscount(id: any) {
      const disableDiscount = {
        status: 'disabled'
      }
      this._menuService.updateDiscount(disableDiscount,id)
        .then(response => {
          this.showDiscount();
        })
    }
    public onChange(event: Event): void {
      let word = (<HTMLInputElement>event.target).value;
      let _self = this;
      _self.discountListSearch = [];
      if(word == '') {
        _self.discountListSearch = this.discountList.slice();
      } else {
        this.discountList.find(function(item) {
          if(item.product.includes(word)) {
            _self.discountListSearch.push(item);
          }
        })
      }
    }

}
