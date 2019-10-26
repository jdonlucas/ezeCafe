import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserGuard } from 'src/app/guards/user.guard';
import { IndexComponent } from './index/index.component';
import { FoodComponent } from './food/food.component';
import { BeverageComponent } from './beverage/beverage.component';
import { MenuComponent } from './menu/menu.component';


const routes: Routes = [
  { path: '', component: IndexComponent, canActivate: [UserGuard], data: { whichUser: 'Mesero' }},
  { path: 'menu', component: MenuComponent, canActivate: [UserGuard], data: { whichUser: 'Mesero' }},
  { path: 'food', component: FoodComponent, canActivate: [UserGuard], data: { whichUser: 'Mesero' }},
  { path: 'beverage', component: BeverageComponent, canActivate: [UserGuard], data: { whichUser: 'Mesero' }}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComandaRoutingModule { }
