import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './guards/auth-guard.service';


const routes: Routes = [
  { path: '', loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule), canActivate: [AuthGuardService], data: { noAuth: true } },
  { path: 'superadmin', loadChildren : () => import('./pages/superadmin/superadmin.module').then(m => m.SuperadminModule), canActivate: [AuthGuardService] },
  { path: 'admin', loadChildren : () => import('./pages/admin/admin.module').then(m => m.AdminModule), canActivate: [AuthGuardService] },
  { path: 'caja', loadChildren : () => import('./pages/caja/caja.module').then(m => m.CajaModule), canActivate: [AuthGuardService] },
  { path: 'comandas', loadChildren : () => import('./pages/mesero/mesero.module').then(m => m.MeseroModule), canActivate: [AuthGuardService] },
  { path: 'estadistica', loadChildren : () => import('./pages/statistics/statistics.module').then(m => m.StatisticsModule), canActivate: [AuthGuardService] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
