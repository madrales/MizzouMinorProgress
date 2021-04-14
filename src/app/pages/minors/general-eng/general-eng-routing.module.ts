import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GeneralEngPage } from './general-eng.page';

const routes: Routes = [
  {
    path: '',
    component: GeneralEngPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GeneralEngPageRoutingModule {}
