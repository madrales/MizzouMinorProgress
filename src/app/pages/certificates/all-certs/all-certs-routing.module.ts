import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllCertsPage } from './all-certs.page';

const routes: Routes = [
  {
    path: '',
    component: AllCertsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllCertsPageRoutingModule {}
