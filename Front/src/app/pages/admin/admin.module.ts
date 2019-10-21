import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
