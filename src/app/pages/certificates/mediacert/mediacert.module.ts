import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MediacertPageRoutingModule } from './mediacert-routing.module';

import { MediacertPage } from './mediacert.page';

import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MediacertPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [MediacertPage]
})
export class MediacertPageModule {}
