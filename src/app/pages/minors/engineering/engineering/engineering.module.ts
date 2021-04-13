import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EngineeringPageRoutingModule } from './engineering-routing.module';

import { EngineeringPage } from './engineering.page';

import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EngineeringPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [EngineeringPage]
})
export class EngineeringPageModule {}
