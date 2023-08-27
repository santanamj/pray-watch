import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HoraPage } from './hora.page';

const routes: Routes = [
  {
    path: '',
    component: HoraPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HoraPageRoutingModule {}
