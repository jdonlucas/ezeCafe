import { Component, OnInit } from '@angular/core';
import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';
import { OrderService } from 'src/app/services/order.service';
import { SalesService } from 'src/app/services/sales.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  faArrowCircleRight = faArrowCircleRight;

  constructor(
    private _orderService: OrderService,
    private _salesService: SalesService) { }

  ngOnInit() {
    this._salesService.showAllSales()
  }

}
