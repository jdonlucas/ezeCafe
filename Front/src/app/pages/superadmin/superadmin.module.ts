import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SuperadminRoutingModule } from './superadmin-routing.module';
import { HomeComponent } from './home/home.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { BajaComponent } from './baja/baja.component';


@NgModule({
  declarations: [HomeComponent, UsuariosComponent, BajaComponent],
  imports: [
    CommonModule,
    SuperadminRoutingModule,
    ReactiveFormsModule
  ]
})
export class SuperadminModule { }
