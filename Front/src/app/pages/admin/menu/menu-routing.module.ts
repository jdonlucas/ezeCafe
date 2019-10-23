import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserGuard } from 'src/app/guards/user.guard';
import { AlimentosComponent } from './alimentos/alimentos.component';
import { BebidasComponent } from './bebidas/bebidas.component';


const routes: Routes = [
  { path: 'alimentos', component: AlimentosComponent, canActivate: [UserGuard], data: { whichUser: 'Admin' }},
  { path: 'bebidas', component: BebidasComponent, canActivate: [UserGuard], data: { whichUser: 'Admin' }}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuRoutingModule { }
