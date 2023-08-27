import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InternationalRegisterPage } from './international-register.page';

const routes: Routes = [
  {
    path: '',
    component: InternationalRegisterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InternationalRegisterPageRoutingModule {}
