import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InfosystemsPage } from './infosystems.page';

const routes: Routes = [
  {
    path: '',
    component: InfosystemsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfosystemsPageRoutingModule {}
