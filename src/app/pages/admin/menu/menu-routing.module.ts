import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserGuard } from 'src/app/guards/user.guard';
import { AlimentosComponent } from './alimentos/alimentos.component';
import { BebidasComponent } from './bebidas/bebidas.component';
import { EspecialComponent } from './especial/especial.component';
import { HomeComponent } from './home/home.component';
import { ExtraComponent } from './extra/extra.component';
import { DiscountsComponent } from './discounts/discounts.component';


const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [UserGuard], data: { whichUser: 'Admin' }},
  { path: 'alimentos', component: AlimentosComponent, canActivate: [UserGuard], data: { whichUser: 'Admin' }},
  { path: 'bebidas', component: BebidasComponent, canActivate: [UserGuard], data: { whichUser: 'Admin' }},
  { path: 'especial', component: EspecialComponent, canActivate: [UserGuard], data: { whichUser: 'Admin' }},
  { path: 'extra', component: ExtraComponent, canActivate: [UserGuard], data: { whichUser: 'Admin' }},
  { path: 'descuentos', component: DiscountsComponent, canActivate: [UserGuard], data: { whichUser: 'Admin' }}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuRoutingModule { }
