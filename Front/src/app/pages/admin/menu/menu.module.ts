import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MenuRoutingModule } from './menu-routing.module';
import { AlimentosComponent } from './alimentos/alimentos.component';
import { BebidasComponent } from './bebidas/bebidas.component';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [AlimentosComponent, BebidasComponent, HomeComponent],
  imports: [
    CommonModule,
    MenuRoutingModule,
    ReactiveFormsModule
  ]
})
export class MenuModule { }
