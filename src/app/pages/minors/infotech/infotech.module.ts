import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfotechPageRoutingModule } from './infotech-routing.module';

import { InfotechPage } from './infotech.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfotechPageRoutingModule
  ],
  declarations: [InfotechPage]
})
export class InfotechPageModule {}
