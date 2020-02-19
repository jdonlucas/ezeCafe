import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserGuard } from 'src/app/guards/user.guard';
import { ChartsComponent } from './charts/charts.component';


const routes: Routes = [
  { path: '', component: ChartsComponent, canActivate: [UserGuard], data: { whichUser: 'SuperAdmin' }}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatisticsRoutingModule { }
