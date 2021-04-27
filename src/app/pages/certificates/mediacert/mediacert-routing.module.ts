import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MediacertPage } from './mediacert.page';

const routes: Routes = [
  {
    path: '',
    component: MediacertPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MediacertPageRoutingModule {}
