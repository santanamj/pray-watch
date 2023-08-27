import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RelogioPageRoutingModule } from './relogio-routing.module';

import { RelogioPage } from './relogio.page';
import { FileSaverModule } from 'ngx-filesaver';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RelogioPageRoutingModule,
    FileSaverModule
  ],
  declarations: [RelogioPage]
})
export class RelogioPageModule {}
