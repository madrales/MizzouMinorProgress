import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CertificatesPage } from './certificates.page';

const routes: Routes = [
  {
    path: '',
    component: CertificatesPage
  },
  {
    path: 'mediacert',
    loadChildren: () => import('./mediacert/mediacert.module').then( m => m.MediacertPageModule)
  },
  {
    path: 'mobilecert',
    loadChildren: () => import('./mobilecert/mobilecert.module').then( m => m.MobilecertPageModule)
  },
  {
    path: 'infosystems',
    loadChildren: () => import('./infosystems/infosystems.module').then( m => m.InfosystemsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CertificatesPageRoutingModule {}
