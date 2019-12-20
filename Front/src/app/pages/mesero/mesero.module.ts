import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MeseroRoutingModule } from './mesero-routing.module';
import { HomeComponent } from './home/home.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    MeseroRoutingModule,
    FontAwesomeModule
  ]
})
export class MeseroModule { }
