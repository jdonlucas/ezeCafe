import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CajaRoutingModule } from './caja-routing.module';
import { HomeComponent } from './home/home.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SalesComponent } from './sales/sales.component';
import { InspectComponent } from './inspect/inspect.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CorteComponent } from './corte/corte.component';
import { PrintComponent } from './print/print.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';


@NgModule({
  declarations: [HomeComponent, SalesComponent, InspectComponent, CorteComponent, PrintComponent],
  imports: [
    CommonModule,
    CajaRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule
  ]
})
export class CajaModule { }
