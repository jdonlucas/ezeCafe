import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.css'],
  providers: [DatePipe]
})
export class PrintComponent implements OnInit {

  public today = new Date();

  constructor(
    private datePipe: DatePipe) { }

  ngOnInit() {
    this.datePipe.transform(this.today,'dd/MM/yyyy')
  }

}
