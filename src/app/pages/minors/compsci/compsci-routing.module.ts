import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompsciPage } from './compsci.page';

const routes: Routes = [
  {
    path: '',
    component: CompsciPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompsciPageRoutingModule {}
