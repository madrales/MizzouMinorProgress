import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MinorsPage } from './minors.page';

const routes: Routes = [
  {
    path: '',
    component: MinorsPage
  },
  {
    path: 'compsci',
    loadChildren: () => import('./compsci/compsci.module').then( m => m.CompsciPageModule)
  },
  {
    path: 'engineering/engineering',
    loadChildren: () => import('./engineering/engineering/engineering.module').then( m => m.EngineeringPageModule)
  },
  {
    path: 'infotech',
    loadChildren: () => import('./infotech/infotech.module').then( m => m.InfotechPageModule)
  },  {
    path: 'general-eng',
    loadChildren: () => import('./general-eng/general-eng.module').then( m => m.GeneralEngPageModule)
  },



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MinorsPageRoutingModule {}
