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
    path: 'all-courses',
    loadChildren: () => import('./pages/all-courses/all-courses.module').then( m => m.AllCoursesPageModule)
  },
  {
    path: '**',
    loadChildren: () => import('./pages/not-found/not-found.module').then( m => m.NotFoundPageModule)
  },
  {
    path: 'certificates',
    loadChildren: () => import('./pages/certificates/certificates.module').then( m => m.CertificatesPageModule)
  },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
