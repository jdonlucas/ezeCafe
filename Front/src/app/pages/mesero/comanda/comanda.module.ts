import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComandaRoutingModule } from './comanda-routing.module';
import { IndexComponent } from './index/index.component';
import { FoodComponent } from './food/food.component';
import { BeverageComponent } from './beverage/beverage.component';
import { BeverageSpecificComponent } from './beverage-specific/beverage-specific.component';
import { MenuComponent } from './menu/menu.component';


@NgModule({
  declarations: [IndexComponent, FoodComponent, BeverageComponent, BeverageSpecificComponent, MenuComponent],
  imports: [
    CommonModule,
    ComandaRoutingModule
  ]
})
export class ComandaModule { }
