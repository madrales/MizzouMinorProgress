import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GeneralEngPageRoutingModule } from './general-eng-routing.module';

import { GeneralEngPage } from './general-eng.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GeneralEngPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [GeneralEngPage]
})
export class GeneralEngPageModule {}
