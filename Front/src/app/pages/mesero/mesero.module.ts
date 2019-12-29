import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MeseroRoutingModule } from './mesero-routing.module';
import { HomeComponent } from './home/home.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { InvoiceComponent } from './invoice/invoice.component';
import { PrintComponent } from './print/print.component';


@NgModule({
  declarations: [HomeComponent, InvoiceComponent, PrintComponent],
  imports: [
    CommonModule,
    MeseroRoutingModule,
    FontAwesomeModule
  ]
})
export class MeseroModule { }
