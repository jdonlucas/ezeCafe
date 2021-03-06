import { Component, OnInit } from '@angular/core';
import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { OrderService } from 'src/app/services/order.service';
import { SalesService } from 'src/app/services/sales.service';
import { DatePipe } from '@angular/common';
import { BulletinService } from 'src/app/services/bulletin.service';
import { faBullhorn } from '@fortawesome/free-solid-svg-icons';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { faNewspaper } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [DatePipe]
})
export class HomeComponent implements OnInit {

  public total = 0.0;
  public totalOrders = 0;
  public pendingOrders = 0;
  public anuncios = [];
  faArrowCircleRight = faArrowCircleRight;
  faExclamationCircle = faExclamationCircle;
  faBullhorn = faBullhorn;
  faBell = faBell;
  faNewspaper = faNewspaper;

  constructor(
    private _orderService: OrderService,
    private _salesService: SalesService,
    private _bulletinService: BulletinService,
    private datePipe: DatePipe) { }

  ngOnInit() {
    let today = new Date();
    let queryDate = this.datePipe.transform(new Date(),'dd-MM-yyyy');
    this._salesService.showAllSales(queryDate).then(resp => {
      let totalSales = resp['salesHistory'];
      for(let i=0;i<totalSales.length;i++) {
          this.total = this.total + totalSales[i].costo;
      }
    });
    this._orderService.showOrders(queryDate).then(resp => {
      let orders = resp['orderHistory'];
      for(let i=0;i<orders.length;i++) {
        if(orders[i].status != 'cancelada') {
          if(this.datePipe.transform(today,'yyyy-MM-dd') == this.datePipe.transform(orders[i].createdAt,'yyyy-MM-dd')) {
            this.totalOrders++;
          }
        }
        if(orders[i].status == 'pendiente') {
          if(this.datePipe.transform(today,'yyyy-MM-dd') == this.datePipe.transform(orders[i].createdAt,'yyyy-MM-dd')) {
            this.pendingOrders++;
          }
        }
      }
    });
    this.fetchNotice();
    localStorage.setItem('dateData', this.formatDate());
  }
  fetchNotice() {
    this._bulletinService.showNotices()
      .then(resp => {
        this.anuncios = [];
        this.anuncios = resp['noticeList']

        this.anuncios.sort((a,b) => 
          a.expiration.localeCompare(b.expiration)
        );
      })
  }
  
  formatDate() {
    var d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [month, day, year].join('-');
  }
  
}
