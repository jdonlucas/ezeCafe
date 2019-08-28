import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { MeseroModule } from './mesero/mesero.module';
import { CajaModule } from './caja/caja.module';
import { AdminModule } from './admin/admin.module';
import { SuperadminModule } from './superadmin/superadmin.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UserRoutingModule,
    MeseroModule,
    CajaModule,
    AdminModule,
    SuperadminModule
  ]
})
export class UserModule { }
