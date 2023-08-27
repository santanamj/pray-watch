import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InternationalRegisterPageRoutingModule } from './international-register-routing.module';

import { InternationalRegisterPage } from './international-register.page';
import { NgxMaskModule, IConfig } from 'ngx-mask'

const maskConfig: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InternationalRegisterPageRoutingModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(maskConfig)
  ],
  declarations: [InternationalRegisterPage]
})
export class InternationalRegisterPageModule {}
