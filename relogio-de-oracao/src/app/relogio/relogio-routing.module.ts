import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RelogioPage } from './relogio.page';

const routes: Routes = [
  {
    path: '',
    component: RelogioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RelogioPageRoutingModule {}
