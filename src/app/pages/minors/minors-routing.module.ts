import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MinorsPage } from './minors.page';

const routes: Routes = [
  {
    path: '',
    component: MinorsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MinorsPageRoutingModule {}
