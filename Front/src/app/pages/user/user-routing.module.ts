import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserGuard } from 'src/app/guards/user.guard';


const routes: Routes = [
  { path: 'mesero', loadChildren: './mesero/mesero.module#MeseroModule', canActivate: [UserGuard]},
  { path: 'caja', loadChildren: './caja/caja.module#CajaModule', canActivate: [UserGuard]},
  { path: 'admin', loadChildren: './admin/admin.module#AdminModule', canActivate: [UserGuard]},
  { path: 'superadmin', loadChildren: './superadmin/superadmin.module#SuperadminModule', canActivate: [UserGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
