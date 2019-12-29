import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ComandaRoutingModule } from './comanda-routing.module';
import { IndexComponent } from './index/index.component';
import { MenuComponent } from './menu/menu.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EditComponent } from './edit/edit.component';
import { InspectComponent } from './inspect/inspect.component';
import { PendingComponent } from './pending/pending.component';

@NgModule({
  declarations: [IndexComponent, MenuComponent, EditComponent, InspectComponent, PendingComponent],
  imports: [
    CommonModule,
    ComandaRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule
  ]
})
export class ComandaModule { }
