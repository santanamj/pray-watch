import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HoraPageRoutingModule } from './hora-routing.module';

import { HoraPage } from './hora.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HoraPageRoutingModule
  ],
  declarations: [HoraPage]
})
export class HoraPageModule {}
