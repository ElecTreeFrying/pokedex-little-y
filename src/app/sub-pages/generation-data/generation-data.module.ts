import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { GenerationDataRoutingModule } from './generation-data-routing.module';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { GenerationDataComponent } from './generation-data.component';


@NgModule({
  declarations: [GenerationDataComponent],
  imports: [
    GenerationDataRoutingModule,
    NativeScriptCommonModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class GenerationDataModule { }
