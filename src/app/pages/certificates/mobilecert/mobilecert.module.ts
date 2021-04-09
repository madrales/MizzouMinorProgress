import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MobilecertPageRoutingModule } from './mobilecert-routing.module';

import { MobilecertPage } from './mobilecert.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MobilecertPageRoutingModule
  ],
  declarations: [MobilecertPage]
})
export class MobilecertPageModule {}
