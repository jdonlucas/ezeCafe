import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public orderData: any;
  public orderForm: FormGroup;
  public foodList: any;
  public errors: any

  constructor(
    private _menuService: MenuService,
    ) { }

  ngOnInit() {
    this.orderForm = new FormGroup ({
      name: new FormControl('',[])
    })
    this.fetchFood();
  }

  fetchFood() {
    this._menuService.showFood()
      .then(response => {
        this.foodList = response['foodList'];
      })
      .catch(err => this.errors = err);
  }

}
