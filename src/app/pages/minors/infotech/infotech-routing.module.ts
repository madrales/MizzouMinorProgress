import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InfotechPage } from './infotech.page';

const routes: Routes = [
  {
    path: '',
    component: InfotechPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfotechPageRoutingModule {}
