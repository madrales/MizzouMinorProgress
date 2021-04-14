import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllCertsPageRoutingModule } from './all-certs-routing.module';

import { AllCertsPage } from './all-certs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllCertsPageRoutingModule
  ],
  declarations: [AllCertsPage]
})
export class AllCertsPageModule {}
