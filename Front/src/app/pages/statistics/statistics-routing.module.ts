import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserGuard } from 'src/app/guards/user.guard';
import { ChartsComponent } from './charts/charts.component';
import { StickersComponent } from './stickers/stickers.component';


const routes: Routes = [
  { path: '', component: ChartsComponent, canActivate: [UserGuard], data: { whichUser: 'SuperAdmin' }},
  { path: 'stickers', component: StickersComponent, canActivate: [UserGuard], data: { whichUser: 'Mesero' }}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatisticsRoutingModule { }
