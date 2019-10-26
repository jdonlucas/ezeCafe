import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComandaRoutingModule } from './comanda-routing.module';
import { IndexComponent } from './index/index.component';
import { FoodComponent } from './food/food.component';
import { BeverageComponent } from './beverage/beverage.component';
import { BeverageSpecificComponent } from './beverage-specific/beverage-specific.component';


@NgModule({
  declarations: [IndexComponent, FoodComponent, BeverageComponent, BeverageSpecificComponent],
  imports: [
    CommonModule,
    ComandaRoutingModule
  ]
})
export class ComandaModule { }
