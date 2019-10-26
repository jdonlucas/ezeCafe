import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { FoodComponent } from './food/food.component';
import { BeverageComponent } from './beverage/beverage.component';
import { BeverageSpecificComponent } from './beverage-specific/beverage-specific.component';


const routes: Routes = [
  { path: '', component: IndexComponent, canActivate: [UserGuard], data: { whichUser: 'Mesero' }},
  { path: 'food', component: FoodComponent, canActivate: [UserGuard], data: { whichUser: 'Mesero' }},
  { path: 'beverage', component: BeverageComponent, canActivate: [UserGuard], data: { whichUser: 'Mesero' }},
  { path: 'beverageSpecific', component: BeverageSpecificComponent, canActivate: [UserGuard], data: { whichUser: 'Mesero' }}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComandaRoutingModule { }
