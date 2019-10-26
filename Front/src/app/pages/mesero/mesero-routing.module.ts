import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserGuard } from 'src/app/guards/user.guard';
import { HomeComponent } from './home/home.component';
import { ComandaComponent } from './comanda/comanda.component'


const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [UserGuard], data: { whichUser: 'Mesero' }},
  { path: 'comanda', loadChildren : './comanda/comanda.module#ComandaModule', canActivate: [UserGuard], data: { whichUser: 'Mesero' }}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MeseroRoutingModule { }
