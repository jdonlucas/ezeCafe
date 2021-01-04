import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, controllers } from 'chart.js';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Color, Label } from 'ng2-charts';
import { StatisticsService } from 'src/app/services/statistics.service';
import { DatePipe } from '@angular/common';
import { MatRadioChange } from '@angular/material/radio';
import { MomentDateAdapter,MAT_MOMENT_DATE_FORMATS,MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { of } from 'rxjs';
import  * as moment from 'moment';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css'],
  providers: [DatePipe,{
    provide: DateAdapter,
    useClass: MomentDateAdapter,
    deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
  },

  {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},]
})
export class ChartsComponent implements OnInit {

  date = new FormControl(new Date());
  startDayDate = new Date();
  public total = 0.0;
  public dateForm: FormGroup;
  public dateFormWeek: FormGroup;
  public yearForm: FormGroup;
  public productForm: FormGroup;
  public month = true;
  public day = false;
  public week = false;
  public year = false;
  public yearsData = [];
  public numberWeek = [];
  public productsList = [];
  public totalWeek = 0.0;
  public totalYear = 0.0;
  public chart = true;
  typeDate = "";
  dateForProduct = ""
  public productMax = {'product': 'any'};

  days = [];
  ventas = [];
  products = [];
  salesProducts = [];
  public chartColors: Array<any> = [
    { // first color
      backgroundColor: 'rgba(195, 40, 96, 0.1)',
      borderColor: 'rgba(195, 40, 96, 1)',
      pointBackgroundColor: 'rgba(195, 40, 96, 1)',
      pointBorderColor: '#202b33',
      pointHoverBackgroundColor: '#202b33',
      pointHoverBorderColor: 'rgba(225,225,225,0.9)',
      pointHoverRadius: 7,
      pointRadius: 6,
    },
    { // second color
      backgroundColor: 'rgba(225,10,24,0.2)',
      borderColor: 'rgba(225,10,24,0.2)',
      pointBackgroundColor: 'rgba(225,10,24,0.2)',
      pointBorderColor: '#202b33',
      pointHoverBackgroundColor: '#202b33',
      pointHoverBorderColor: 'rgba(225,10,24,0.2)',
      pointHoverRadius: 7,
      pointRadius: 6,
    }];

  constructor(
    private _statisticsService: StatisticsService,
    private datePipe: DatePipe,
    private _adapter: DateAdapter<any>,
    private formBuilder: FormBuilder
    ) { 
        let allYears = [];
        this._adapter.setLocale('es');
        let year = this.datePipe.transform(new Date(),'yyyy');
        let monthWeekNumber = this.datePipe.transform(new Date(),'MM');
        this.dateFormWeek = this.formBuilder.group({
          yearWeek : [year],
          monthWeek: [monthWeekNumber],
          week: ['']
        });

        this.yearForm = this.formBuilder.group({
          yearSelect: ['']
        })
        
        this._statisticsService.years().then((resp: number[]) => {
          resp.sort(function(a, b){return b-a})
          resp.forEach(year => {
            allYears.push({ id: year, name: year });
          });
          this.yearsData = allYears;
          this.yearForm.controls.yearSelect.patchValue(this.yearsData[0].id);
          this.totalYear = 0.0;
          this._statisticsService.getYear(String(this.yearForm.value.yearSelect)).then(resp => {
            let infoVenta:  any;
            infoVenta = resp;
            for (let i=0;i<infoVenta.length;i++) {
              this.totalYear += infoVenta[i].total;
            }
          })
        })

        of(this.getWeekDateMonth()).subscribe(weeks => {
          this.numberWeek = weeks;
          let date =  moment(new Date).week();
          let lastMonth = moment(new Date()).subtract(1, 'M').endOf('month').week();
          let realWeek = date - lastMonth;
          if (this.dateFormWeek.value.monthWeek == '01') {
            realWeek = date - 1;
          }
          this.dateFormWeek.controls.week.patchValue(this.numberWeek[realWeek].id);
        });

        
    }

  ngOnInit() {
    let queryDate = this.datePipe.transform(new Date(),'dd-MM-yyyy');
    let year = this.datePipe.transform(new Date(),'yyyy');
    let monthWeekNumber = this.datePipe.transform(new Date(),'MM');
    let month = '01-' + monthWeekNumber;

    this.productForm = new FormGroup ({
      product: new FormControl('drink', [
      ])
    })

    this.dateForm = new FormGroup ({
      year: new FormControl(year, [
      ]),
      month: new FormControl(month, [
      ]),
    })

    this._statisticsService.getMonth(queryDate).then(resp => {
      let infoVenta:  any;
      infoVenta = resp;
      infoVenta.sort((a,b) => 
        parseInt(a.day) - parseInt(b.day)
      );
      for (let i=0;i<infoVenta.length;i++) {
        this.days.push(infoVenta[i].day)
        this.ventas.push(infoVenta[i].total)
      }
    });

    this.changeTotalWeek(queryDate);


    this.typeDate = 'month'; this.dateForProduct = queryDate;
    this._statisticsService.getDrink('month',queryDate).then((resp: any) => {
      this.productMax = resp.reduce(function(prev, current) { return (prev.quantity > current.quantity) ? prev : current })
      this.products = resp.map( x => { return x.product } );
      this.salesProducts = resp.map( x => { return x.quantity });
      this.productsList = resp.sort((a,b) => {
        if(a.quantity > b.quantity) {return -1}
        if(a.quantity < b.quantity) {return 1}
      });
      this.productschartData()
    })
  }

  chartData () {
    this.lineChartData  = [
      { data: this.ventas,
       },
    ];
    this.lineChartLabels = this.days;
  }
  productschartData () {
    this.productChartData  = [
      { data: this.salesProducts,
       },
    ];
    this.productChartLabels = this.products;
  }

  onChangeDate() {
    let date = this.dateForm.value.month + '-' + this.dateForm.value.year;
    this.days = [];
    this.ventas = [];
    this.changeTotalWeek(date);
    this.setProduct('month',date);
    this._statisticsService.getMonth(date).then(resp => {
      let infoVenta:  any;
      infoVenta = resp;
      infoVenta.sort((a,b) => 
      parseInt(a.day) - parseInt(b.day)
    );
      for (let i=0;i<infoVenta.length;i++) {
        this.days.push(infoVenta[i].day)
        this.ventas.push(infoVenta[i].total)
      }
    }).catch(err => { console.log('no hay datos') });
    this.chartData();
  }

  onChangeWeekDate() {
    let date:any;
    if (this.dateFormWeek.value.monthWeek != '01') {
      date =  moment(this.dateFormWeek.value.yearWeek + '-' + this.dateFormWeek.value.monthWeek + '-01' )
                .subtract(1, 'M').endOf('M').week();
    } else {
      date = 0;
    }
    let weekYear = this.dateFormWeek.value.week - 1 + date;
    if (this.dateFormWeek.value.monthWeek == '01') {
      weekYear = weekYear + 1;
    }
    let start = moment().startOf('week').week(weekYear).format('DD-MM-YYYY');
    let end = moment().endOf('week').week(weekYear).format('DD-MM-YYYY');
    this.days = [];
    this.ventas = [];
    this.totalWeek = 0.0;
    let packDate = {'start': start, 'end': end}
    this.setProduct('week',packDate);
    this._statisticsService.getWeek(start,end).then(resp => {
      let infoVenta:  any;
      infoVenta = resp;
      for (let i=0;i<infoVenta.length;i++) {
        this.totalWeek += infoVenta[i].total;
        this.days.push(infoVenta[i].day)
        this.ventas.push(infoVenta[i].total)
      }
    }).catch(err => { console.log("no hay datos")});
    this.chartData();
  } 

  getWeekDateMonth() {
    let date =  moment(this.dateFormWeek.value.yearWeek + '-' + this.dateFormWeek.value.monthWeek + '-01' )
              .endOf('M').week();
    let lastMonth = moment(this.dateFormWeek.value.yearWeek + '-' + this.dateFormWeek.value.monthWeek + '-01').subtract(1, 'M').endOf('month').week()
    let realWeek = date - lastMonth + 1;
    if (this.dateFormWeek.value.monthWeek == '01') {
      realWeek = date;
    }
    let weeks = [];
    for (let k=1;k<=realWeek;k++) {
      weeks.push({ id: k, name: k })
    }

    return weeks;
    
  }

  onChangeDayDate() {
    let day = this.datePipe.transform(this.date.value,'dd-MM-yyyy');
    this.days = [];
    this.ventas = [];
    this.setProduct('day',day);
    this._statisticsService.getDay(day).then(resp => {
      let infoVenta:  any;
      infoVenta = resp;
      for (let i=0;i<infoVenta.length;i++) {
        this.days.push(infoVenta[i].hour)
        this.ventas.push(infoVenta[i].total)
      }
    }).catch(err => { console.log(err) })
    this.chartData();
  }

  onChangeYearDate() {
    let year = String(this.yearForm.value.yearSelect);
    console.log(year)
    this.days = [];
    this.ventas = [];
    this.totalYear = 0.0;
    this.setProduct('year',year);
    this._statisticsService.getYear(year).then(resp => {
      let infoVenta:  any;
      infoVenta = resp;
      for (let i=0;i<infoVenta.length;i++) {
        this.totalYear += infoVenta[i].total;
        this.days.push(infoVenta[i].month)
        this.ventas.push(infoVenta[i].total)
      }
    })
    this.chartData();
  }
  
  changeTotalWeek(dateOf) {
    let date =  moment(dateOf, 'DD-MM-YYYY','es').week();
    let weekYear = date;
    let start = moment().startOf('week').week(weekYear).format('DD-MM-YYYY');
    let end = moment().endOf('week').week(weekYear).format('DD-MM-YYYY');
    this.totalWeek = 0.0;
    this._statisticsService.getWeek(start,end).then(resp => {
      let infoVenta:  any;
      infoVenta = resp;
      for (let i=0;i<infoVenta.length;i++) {
        this.totalWeek += infoVenta[i].total;
      }
    }).catch(err => { console.log("no hay datos")});
  }

  getWeeks () {

    of(this.getWeekDateMonth()).subscribe(weeks => {
      this.numberWeek = weeks;
      this.dateFormWeek.controls.week.patchValue(this.numberWeek[0].id);
    });

    this.onChangeWeekDate();

  }
  lineChartData: ChartDataSets[] = [
    { data: this.ventas,
   },
  ];

  productChartData: ChartDataSets[] = [
    { data: this.salesProducts,
   },
  ];

  lineChartLabels: Label[] = this.days;
  productChartLabels: Label[] = this.products;

  lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        ticks: {
          fontColor: "rgba(255,255,255,0.7)",
          fontSize: 14,
          padding: 7,
        },
        gridLines: {
          color: "rgba(255,255,255,0.1)",
          lineWidth: 1,
          zeroLineColor: 'rgba(255,255,255,0)',
          drawBorder: false
        },
      }],
      yAxes: [{
        ticks: {
          fontColor: "rgba(255,255,255,0.7)",
          fontSize: 14,
          padding: 7,
        },
        gridLines: {
            color: 'rgba(255,255,255,0.1)', //give the needful color
            lineWidth: 1,
            zeroLineColor: 'rgba(255,255,255,0)',
            drawBorder: false
        },
      }],
    }
  };

  lineChartColors: Color[] = [
    {
      backgroundColor: 'rgba(168, 247, 221, 0.9)',
      borderColor: 'rgba(195, 40, 96, 1)',
    },
  ];

  lineChartLegend = false;
  lineChartPlugins = [];
  lineChartType = 'line';
  productChartType = 'bar';
  
  radioChange(event: MatRadioChange) {
    this.week = this.month = this.day = this.year = false;
    if( event.value == 'month' ) {
      this.onChangeDate();
      this.month = true;
    } else if ( event.value == 'week' ) {
      this.onChangeWeekDate();
      this.week = true;
    } else if ( event.value == 'day' ) {
      this.onChangeDayDate();
      this.day = true;
    } else if ( event.value == 'year' ) {
      this.onChangeYearDate();
      this.year = true;
    }
  }
  
  radioChangeProduct(event: MatRadioChange) {
    if( event.value == 'plot') {
      this.chart = true;
    } else {
      this.chart = false;
    }
  }

  setProduct(typeOfDate: any,date: any) {
    this.productsList = []; this.products = []; this.salesProducts = [];
    if (this.productForm.value.product == 'food') {
      this._statisticsService.getFood(typeOfDate,date).then((resp: any) => {
        this.productMax = resp.reduce(function(prev, current) { return (prev.quantity > current.quantity) ? prev : current })
        this.products = resp.map( x => { return x.product } );
        this.salesProducts = resp.map( x => { return x.quantity });
        this.productsList = resp.sort((a,b) => {
          if(a.quantity > b.quantity) {return -1}
          if(a.quantity < b.quantity) {return 1}
        });
        this.productschartData()
      })
    } else {
      this._statisticsService.getDrink(typeOfDate,date).then((resp: any) => {
        this.productMax = resp.reduce(function(prev, current) { return (prev.quantity > current.quantity) ? prev : current })
        this.products = resp.map( x => { return x.product } );
        this.salesProducts = resp.map( x => { return x.quantity });
        this.productsList = resp.sort((a,b) => {
          if(a.quantity > b.quantity) {return -1}
          if(a.quantity < b.quantity) {return 1}
        });
        this.productschartData()
      })
    }
    this.typeDate = typeOfDate; this.dateForProduct = date;
  }
  changeProductSelect() {
    if (this.productForm.value.product == 'food') {
      this._statisticsService.getFood(this.typeDate,this.dateForProduct).then((resp: any) => {
        this.productMax = resp.reduce(function(prev, current) { return (prev.quantity > current.quantity) ? prev : current })
        this.products = resp.map( x => { return x.product } );
        this.salesProducts = resp.map( x => { return x.quantity });
        this.productsList = resp.sort((a,b) => {
          if(a.quantity > b.quantity) {return -1}
          if(a.quantity < b.quantity) {return 1}
        });
        this.productschartData()
      })
    } else {
      this._statisticsService.getDrink(this.typeDate,this.dateForProduct).then((resp: any) => {
        this.productMax = resp.reduce(function(prev, current) { return (prev.quantity > current.quantity) ? prev : current })
        this.products = resp.map( x => { return x.product } );
        this.salesProducts = resp.map( x => { return x.quantity });
        this.productsList = resp.sort((a,b) => {
          if(a.quantity > b.quantity) {return -1}
          if(a.quantity < b.quantity) {return 1}
        });
        this.productschartData()
      })
    }
  }

}
