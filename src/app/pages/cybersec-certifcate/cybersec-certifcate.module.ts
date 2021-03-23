import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CybersecCertifcatePageRoutingModule } from './cybersec-certifcate-routing.module';

import { CybersecCertifcatePage } from './cybersec-certifcate.page';

import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CybersecCertifcatePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CybersecCertifcatePage]
})
export class CybersecCertifcatePageModule {}
