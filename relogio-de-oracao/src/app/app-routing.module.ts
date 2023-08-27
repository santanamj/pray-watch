import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'dia',
    loadChildren: () => import('./pages/dia/dia.module').then( m => m.DiaPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'hora',
    loadChildren: () => import('./pages/hora/hora.module').then( m => m.HoraPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'international-register',
    loadChildren: () => import('./pages/international-register/international-register.module').then( m => m.InternationalRegisterPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
