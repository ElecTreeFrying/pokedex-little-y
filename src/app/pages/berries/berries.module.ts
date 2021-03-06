import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';

import { BerriesRoutingModule } from './berries-routing.module';
import { ExportGridPipeModule } from "../../_common/modules/export-grid-pipe.module";

import { BerriesComponent } from './berries.component';


@NgModule({
  declarations: [
    BerriesComponent
  ],
  imports: [
    NativeScriptCommonModule,
    BerriesRoutingModule,
    ExportGridPipeModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class BerriesModule { }
