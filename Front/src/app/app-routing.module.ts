import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './guards/auth-guard.service';


const routes: Routes = [
  { path: '', loadChildren: './pages/auth/auth.module#AuthModule', canActivate: [AuthGuardService], data: { noAuth: true } },
  { path: 'superadmin', loadChildren : './pages/superadmin/superadmin.module#SuperadminModule', canActivate: [AuthGuardService] },
  { path: 'admin', loadChildren : './pages/admin/admin.module#AdminModule', canActivate: [AuthGuardService] },
  { path: 'caja', loadChildren : './pages/caja/caja.module#CajaModule', canActivate: [AuthGuardService] },
  { path: 'comandas', loadChildren : './pages/mesero/mesero.module#MeseroModule', canActivate: [AuthGuardService] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
