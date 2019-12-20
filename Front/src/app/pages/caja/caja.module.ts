import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CajaRoutingModule } from './caja-routing.module';
import { HomeComponent } from './home/home.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SalesComponent } from './sales/sales.component';


@NgModule({
  declarations: [HomeComponent, SalesComponent],
  imports: [
    CommonModule,
    CajaRoutingModule,
    FontAwesomeModule
  ]
})
export class CajaModule { }
