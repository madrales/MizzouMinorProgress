import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompsciPageRoutingModule } from './compsci-routing.module';

import { CompsciPage } from './compsci.page';


import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompsciPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CompsciPage]
})
export class CompsciPageModule {}
