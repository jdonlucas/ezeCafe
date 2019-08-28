import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './guards/auth-guard.service';


const routes: Routes = [
  { path: '', loadChildren: './pages/auth/auth.module#AuthModule', canActivate: [AuthGuardService], data: { noAuth: true } },
  { path: 'user', loadChildren: './pages/user/user.module#UserModule', canActivate: [AuthGuardService] }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
