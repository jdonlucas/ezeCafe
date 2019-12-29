import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CajaRoutingModule } from './caja-routing.module';
import { HomeComponent } from './home/home.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SalesComponent } from './sales/sales.component';
import { InspectComponent } from './inspect/inspect.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [HomeComponent, SalesComponent, InspectComponent],
  imports: [
    CommonModule,
    CajaRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule
  ]
})
export class CajaModule { }
