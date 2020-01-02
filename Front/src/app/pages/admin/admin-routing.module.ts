import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserGuard } from 'src/app/guards/user.guard';
import { HomeComponent } from './home/home.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { BajaComponent } from './baja/baja.component';
import { SettingsComponent } from './settings/settings.component';


const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [UserGuard], data: { whichUser: 'Admin' }},
  { path: 'inventario', loadChildren : './inventario/inventario.module#InventarioModule', canActivate: [UserGuard], data: { whichUser: 'Admin' }},
  { path: 'menu', loadChildren : './menu/menu.module#MenuModule', canActivate: [UserGuard], data: { whichUser: 'Admin' }},
  { path: 'users', component: UsuariosComponent, canActivate: [UserGuard], data: { whichUser: 'Admin' }},
  { path: 'baja', component: BajaComponent, canActivate: [UserGuard], data: { whichUser: 'Admin' }},
  { path: 'settings', component: SettingsComponent, canActivate: [UserGuard], data: { whichUser: 'Admin' }}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }