import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RegisterPageRoutingModule } from './register-routing.module';
import { RegisterPage } from './register.page';
import { TextMaskModule } from 'angular2-text-mask';
import { NgBrazil } from 'ng-brazil' 
import { NgxMaskModule, IConfig } from 'ngx-mask'

const maskConfig: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RegisterPageRoutingModule,
    TextMaskModule,
    NgBrazil,
    NgxMaskModule.forRoot(maskConfig)
    
  ],
  declarations: [RegisterPage],
})
export class RegisterPageModule {}
