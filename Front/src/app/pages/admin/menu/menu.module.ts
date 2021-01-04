import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MenuRoutingModule } from './menu-routing.module';
import { AlimentosComponent } from './alimentos/alimentos.component';
import { BebidasComponent } from './bebidas/bebidas.component';
import { HomeComponent } from './home/home.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EspecialComponent } from './especial/especial.component';
import { ExtraComponent } from './extra/extra.component';
import { DiscountsComponent } from './discounts/discounts.component';


@NgModule({
  declarations: [AlimentosComponent, BebidasComponent, HomeComponent, EspecialComponent, ExtraComponent, DiscountsComponent],
  imports: [
    CommonModule,
    MenuRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ]
})
export class MenuModule { }
