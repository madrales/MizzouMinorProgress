import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';


@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule
  ],
  exports:[NavbarComponent],
  entryComponents:[NavbarComponent]
})
export class ComponentModule { }
