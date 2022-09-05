import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceLevelDirective } from './service-level.directive';



@NgModule({
  declarations: [
    ServiceLevelDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ServiceLevelDirective
  ]
})
export class ValidatorsModule { }
