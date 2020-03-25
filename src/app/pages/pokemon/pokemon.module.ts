import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';

import { PokemonRoutingModule } from './pokemon-routing.module';
import { ExportGridPipeModule } from "../../_common/modules/export-grid-pipe.module";

import { PokemonComponent } from './pokemon.component';

@NgModule({
  declarations: [
    PokemonComponent
  ],
  imports: [
    NativeScriptCommonModule,
    PokemonRoutingModule,
    ExportGridPipeModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class PokemonModule { }
