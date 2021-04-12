import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompsciPageRoutingModule } from './compsci-routing.module';

import { CompsciPage } from './compsci.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompsciPageRoutingModule
  ],
  declarations: [CompsciPage]
})
export class CompsciPageModule {}
