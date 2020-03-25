import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { TypeDataRoutingModule } from './type-data-routing.module';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { TypeDataComponent } from './type-data.component';


@NgModule({
  declarations: [TypeDataComponent],
  imports: [
    TypeDataRoutingModule,
    NativeScriptCommonModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class TypeDataModule { }
