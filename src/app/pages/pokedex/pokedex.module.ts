import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';

import { PokedexRoutingModule } from './pokedex-routing.module';
import { ExportGridPipeModule } from "../../_common/modules/export-grid-pipe.module";

import { PokedexComponent } from './pokedex.component';


@NgModule({
  declarations: [
    PokedexComponent
  ],
  imports: [
    NativeScriptCommonModule,
    PokedexRoutingModule,
    ExportGridPipeModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class PokedexModule { }
