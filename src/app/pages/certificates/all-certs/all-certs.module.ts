import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllCertsPageRoutingModule } from './all-certs-routing.module';

import { AllCertsPage } from './all-certs.page';

import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllCertsPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AllCertsPage]
})
export class AllCertsPageModule {}
