import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserGuard } from 'src/app/guards/user.guard';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [UserGuard], data: { whichUser: 'Admin' }},
  { path: 'inventario', loadChildren : './inventario/inventario.module#InventarioModule', canActivate: [UserGuard], data: { whichUser: 'Admin' }}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
