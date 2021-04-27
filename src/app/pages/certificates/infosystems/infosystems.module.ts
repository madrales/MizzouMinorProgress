import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfosystemsPageRoutingModule } from './infosystems-routing.module';

import { InfosystemsPage } from './infosystems.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfosystemsPageRoutingModule
  ],
  declarations: [InfosystemsPage]
})
export class InfosystemsPageModule {}
