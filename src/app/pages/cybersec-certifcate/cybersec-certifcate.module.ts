import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CybersecCertifcatePageRoutingModule } from './cybersec-certifcate-routing.module';

import { CybersecCertifcatePage } from './cybersec-certifcate.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CybersecCertifcatePageRoutingModule
  ],
  declarations: [CybersecCertifcatePage]
})
export class CybersecCertifcatePageModule {}
