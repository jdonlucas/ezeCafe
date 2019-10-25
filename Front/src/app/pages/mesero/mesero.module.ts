import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MeseroRoutingModule } from './mesero-routing.module';
import { HomeComponent } from './home/home.component';
import { ComandaComponent } from './comanda/comanda.component';


@NgModule({
  declarations: [HomeComponent, ComandaComponent],
  imports: [
    CommonModule,
    MeseroRoutingModule
  ]
})
export class MeseroModule { }
