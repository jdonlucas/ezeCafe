import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Color, Label } from 'ng2-charts';
import { StatisticsService } from 'src/app/services/statistics.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css'],
  providers: [DatePipe]
})
export class ChartsComponent implements OnInit {

  public total = 0.0;
  public dateForm: FormGroup;
  days = [];
  ventas = [];
  public chartColors: Array<any> = [
    { // first color
      backgroundColor: 'rgba(225,10,24,0.2)',
      borderColor: 'rgba(225,10,24,0.2)',
      pointBackgroundColor: 'rgba(225,10,24,0.2)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(225,10,24,0.2)'
    },
    { // second color
      backgroundColor: 'rgba(225,10,24,0.2)',
      borderColor: 'rgba(225,10,24,0.2)',
      pointBackgroundColor: 'rgba(225,10,24,0.2)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(225,10,24,0.2)'
    }];

  constructor(
    private _statisticsService: StatisticsService,
    private datePipe: DatePipe
    ) { }

  ngOnInit() {
    let queryDate = this.datePipe.transform(new Date(),'dd-MM-yyyy');
    let year = this.datePipe.transform(new Date(),'yyyy');
    let month = this.datePipe.transform(new Date(),'MM');
    month = '01-' + month;
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
  }

  chartData () {
    this.lineChartData  = [
      { data: this.ventas, label: 'Ventas diarias por mes' },
    ];
    this.lineChartLabels = this.days;
  }

  onChangeDate() {
    let date = this.dateForm.value.month + '-' + this.dateForm.value.year;
    this.days = [];
    this.ventas = [];
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
    });
    this.chartData();
  }

  lineChartData: ChartDataSets[] = [
    { data: this.ventas, label: 'Ventas diarias por mes' },
  ];

  lineChartLabels: Label[] = this.days;

  lineChartOptions = {
    responsive: true,
  };

  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,255,0,0.28)',
    },
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';
  

}
