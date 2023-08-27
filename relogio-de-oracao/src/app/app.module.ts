import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouteReuseStrategy } from '@angular/router';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import { HttpClientModule, HttpHeaders, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { AgendaService } from './services/agenda.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule, IConfig } from 'ngx-mask'
import { StoreHoras } from './stores/horas';
import { AuthGuard } from './guards/auth.guard';
import { AuthInterceptor } from './guards/authconfig.interceptor';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, IonicModule.forRoot(), 
    AppRoutingModule,
    HttpClientModule,
    FormsModule, 
    ReactiveFormsModule,
   
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, 
    AuthService, 
    AgendaService,
    StoreHoras,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
           {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ]
})
export class AppModule {}
export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;