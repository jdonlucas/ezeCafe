import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { InventarioRoutingModule } from './inventario-routing.module';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    InventarioRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [
    DatePipe
  ] 
})
export class InventarioModule { }
