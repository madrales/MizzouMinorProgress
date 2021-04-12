import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllCoursesPageRoutingModule } from './all-courses-routing.module';

import { AllCoursesPage } from './all-courses.page';


import { ReactiveFormsModule } from "@angular/forms"; 
import { ComponentModule } from 'src/app/components/component/component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllCoursesPageRoutingModule,
    ReactiveFormsModule,
    ComponentModule
  ],
  declarations: [AllCoursesPage]
})
export class AllCoursesPageModule {}
