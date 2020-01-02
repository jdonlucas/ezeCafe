import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserGuard } from 'src/app/guards/user.guard';
import { HomeComponent } from './home/home.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { PrintComponent } from './print/print.component';


const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [UserGuard], data: {whichUser: 'Mesero'}},
  { path: 'index', loadChildren : './comanda/comanda.module#ComandaModule', canActivate: [UserGuard], data: {whichUser: 'Mesero'}},
  { path: 'print', outlet: 'print', component: PrintComponent, children: [{ path: 'invoice/:id', component: InvoiceComponent}], canActivate: [UserGuard], data: {whichUser: 'Mesero'}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MeseroRoutingModule { }
