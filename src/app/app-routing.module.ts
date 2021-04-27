import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'minors',
    loadChildren: () => import('./pages/minors/minors.module').then( m => m.MinorsPageModule)
  },
  {
    path: 'certificates',
    loadChildren: () => import('./pages/certificates/certificates.module').then( m => m.CertificatesPageModule)
  },
  {
    path: 'cybersec-certifcate',
    loadChildren: () => import('./pages/cybersec-certifcate/cybersec-certifcate.module').then( m => m.CybersecCertifcatePageModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./pages/about/about.module').then( m => m.AboutPageModule)
  },
  {
    path: '**',
    loadChildren: () => import('./pages/not-found/not-found.module').then( m => m.NotFoundPageModule)
  },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
