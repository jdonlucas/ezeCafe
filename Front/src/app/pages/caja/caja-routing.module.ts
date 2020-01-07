import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserGuard } from 'src/app/guards/user.guard';
import { HomeComponent } from './home/home.component';
import { SalesComponent } from './sales/sales.component';
import { InspectComponent } from './inspect/inspect.component';
import { PrintComponent } from './print/print.component';
import { CorteComponent } from './corte/corte.component';


const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [UserGuard], data: { whichUser: 'Caja' }},
  { path: 'sales', component: SalesComponent, canActivate: [UserGuard], data: { whichUser: 'Caja' }},
  { path: 'venta/:id', component: InspectComponent, canActivate: [UserGuard], data: { whichUser: 'Caja' }},
  { path: 'imprime', outlet: 'print', component: PrintComponent, children: [{ path: 'corte', component: CorteComponent}], canActivate: [UserGuard], data: {whichUser: 'Caja'}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CajaRoutingModule { }
