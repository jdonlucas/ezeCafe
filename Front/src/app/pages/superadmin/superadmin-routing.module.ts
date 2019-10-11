import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserGuard } from 'src/app/guards/user.guard';
import { HomeComponent } from './home/home.component';
import { UsuariosComponent } from './usuarios/usuarios.component';


const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [UserGuard], data: { whichUser: 'SuperAdmin' }},
  { path: 'users', component: UsuariosComponent, canActivate: [UserGuard], data: { whichUser: 'SuperAdmin' }},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperadminRoutingModule { }
