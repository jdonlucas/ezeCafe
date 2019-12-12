import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public orderData: any;
  public orderForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.orderForm = new FormGroup ({
      name: new FormControl('',[])
    })
  }

}
