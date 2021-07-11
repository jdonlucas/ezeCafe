import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { DatePipe } from '@angular/common';
import { StatisticsService } from 'src/app/services/statistics.service';

@Component({
  selector: 'app-stickers',
  templateUrl: './stickers.component.html',
  styleUrls: ['./stickers.component.css'],
  providers: [DatePipe]
})
export class StickersComponent implements OnInit {

  public dateForm: FormGroup;
  public karla = 0;
  public karlaAmount = 0;

  constructor(
    private _statisticsService: StatisticsService,
    private datePipe: DatePipe) { }

  ngOnInit(): void {
    let queryDate = this.datePipe.transform(new Date(),'dd-MM-yyyy');
    let year = this.datePipe.transform(new Date(),'yyyy');
    let monthWeekNumber = this.datePipe.transform(new Date(),'MM');
    let month = '01-' + monthWeekNumber;

    this.dateForm = new FormGroup ({
      year: new FormControl(year, [
      ]),
      month: new FormControl(month, [
      ]),
    })


    this._statisticsService.getStickersSale(queryDate).then(resp => {
      this.karla = resp[0].karla;
      this.karlaAmount = resp[0].karlaAmount;
    }).catch(err => {});
  }


  onChangeDate() {
    let date = this.dateForm.value.month + '-' + this.dateForm.value.year;
    this._statisticsService.getStickersSale(date).then(resp => {
      this.karla = resp[0].karla;
      this.karlaAmount = resp[0].karlaAmount;
    }).catch(err => { console.log('no hay datos') });
  }

}
