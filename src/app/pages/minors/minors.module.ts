import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MinorsPageRoutingModule } from './minors-routing.module';

import { MinorsPage } from './minors.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MinorsPageRoutingModule
  ],
  declarations: [MinorsPage]
})
export class MinorsPageModule {}
