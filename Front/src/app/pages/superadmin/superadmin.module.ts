import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuperadminRoutingModule } from './superadmin-routing.module';
import { HomeComponent } from './home/home.component';
import { UsuariosComponent } from './usuarios/usuarios.component';


@NgModule({
  declarations: [HomeComponent, UsuariosComponent],
  imports: [
    CommonModule,
    SuperadminRoutingModule
  ]
})
export class SuperadminModule { }
