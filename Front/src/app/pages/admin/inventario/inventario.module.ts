import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { InventarioRoutingModule } from './inventario-routing.module';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    InventarioRoutingModule,
    ReactiveFormsModule,
  ]
})
export class InventarioModule { }
