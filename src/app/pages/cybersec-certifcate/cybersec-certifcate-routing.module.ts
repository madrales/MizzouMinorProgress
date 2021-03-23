import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CybersecCertifcatePage } from './cybersec-certifcate.page';

const routes: Routes = [
  {
    path: '',
    component: CybersecCertifcatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CybersecCertifcatePageRoutingModule {}
