import { Component, OnInit } from '@angular/core';
import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';
import { OrderService } from 'src/app/services/order.service';
import { SalesService } from 'src/app/services/sales.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [DatePipe]
})
export class HomeComponent implements OnInit {

  faArrowCircleRight = faArrowCircleRight;

  constructor(
    private _orderService: OrderService,
    private _salesService: SalesService,
    private datePipe: DatePipe) { }

  ngOnInit() {
    let queryDate = this.datePipe.transform(new Date(),'dd-MM-yyyy');
    this._salesService.showAllSales(queryDate)
  }

}
