import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ComandaRoutingModule } from './comanda-routing.module';
import { IndexComponent } from './index/index.component';
import { MenuComponent } from './menu/menu.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [IndexComponent, MenuComponent],
  imports: [
    CommonModule,
    ComandaRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule
  ]
})
export class ComandaModule { }
