import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';

import { GenerationRoutingModule } from './generation-routing.module';
import { ExportGridPipeModule } from "../../_common/modules/export-grid-pipe.module";

import { GenerationComponent } from './generation.component';


@NgModule({
  declarations: [GenerationComponent],
  imports: [
    NativeScriptCommonModule,
    GenerationRoutingModule,
    ExportGridPipeModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class GenerationModule { }
