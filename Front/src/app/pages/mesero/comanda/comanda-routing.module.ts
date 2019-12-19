import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserGuard } from 'src/app/guards/user.guard';
import { IndexComponent } from './index/index.component';
import { MenuComponent } from './menu/menu.component';
import { EditComponent } from './edit/edit.component';
import { InspectComponent } from './inspect/inspect.component';


const routes: Routes = [
  { path: '', component: IndexComponent, canActivate: [UserGuard], data: { whichUser: 'Mesero' }},
  { path: 'crear', component: MenuComponent, canActivate: [UserGuard], data: { whichUser: 'Mesero' }},
  { path: 'edit/:id', component: EditComponent, canActivate: [UserGuard], data: { whichUser: 'Mesero' }},
  { path: 'inspect/:id', component: InspectComponent, canActivate: [UserGuard], data: {whichUser: 'Mesero'}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComandaRoutingModule { }
