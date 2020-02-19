import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { StatisticsRoutingModule } from './statistics-routing.module';
import { ChartsComponent } from './charts/charts.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [ChartsComponent],
  imports: [
    CommonModule,
    StatisticsRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ]
})
export class StatisticsModule { }
