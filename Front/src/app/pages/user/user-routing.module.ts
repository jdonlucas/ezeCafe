import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserGuard } from 'src/app/guards/user.guard';


const routes: Routes = [
  { path: 'mesero', loadChildren: './mesero/mesero.module#MeseroModule', canActivate: [UserGuard], data: { whichUser: 'Mesero' }},
  { path: 'caja', loadChildren: './caja/caja.module#CajaModule', canActivate: [UserGuard], data: { whichUser: 'Caja' }},
  { path: 'admin', loadChildren: './admin/admin.module#AdminModule', canActivate: [UserGuard], data: { whichUser: 'Admin' }},
  { path: 'superadmin', loadChildren: './superadmin/superadmin.module#SuperadminModule', canActivate: [UserGuard], data: { whichUser: 'SuperAdmin' }},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
