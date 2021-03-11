import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ITCourseSelectionComponent } from './pages/itcourse-selection/itcourse-selection.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'informationtechnology',
    loadChildren: () => import('./pages/itcourse-selection/itcourse-selection.component').then( m => m.ITCourseSelectionComponent),
  },
  {
    path: 'all-courses',
    loadChildren: () => import('./pages/all-courses/all-courses.module').then( m => m.AllCoursesPageModule)
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
