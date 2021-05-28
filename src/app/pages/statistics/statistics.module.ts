import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { StatisticsRoutingModule } from './statistics-routing.module';
import { ChartsComponent } from './charts/charts.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';

import { ChartsModule } from 'ng2-charts';
import { StickersComponent } from './stickers/stickers.component';
import { ProductsComponent } from './products/products.component';
import { ChartIndexComponent } from './chart-index/chart-index.component';

@NgModule({
  declarations: [ChartsComponent, StickersComponent, ProductsComponent, ChartIndexComponent],
  imports: [
    CommonModule,
    StatisticsRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    ChartsModule,
    MatRadioModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule
  ]
})
export class StatisticsModule { }
