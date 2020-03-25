import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { BerryDataRoutingModule } from './berry-data-routing.module';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { BerryDataComponent } from './berry-data.component';


@NgModule({
  declarations: [BerryDataComponent],
  imports: [
    BerryDataRoutingModule,
    NativeScriptCommonModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class BerryDataModule { }
