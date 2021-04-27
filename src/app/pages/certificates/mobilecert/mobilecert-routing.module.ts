import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MobilecertPage } from './mobilecert.page';

const routes: Routes = [
  {
    path: '',
    component: MobilecertPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MobilecertPageRoutingModule {}
