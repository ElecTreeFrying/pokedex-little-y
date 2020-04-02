import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';

import { PokemonDataRoutingModule } from './pokemon-data-routing.module';

import { PokemonDataComponent } from './pokemon-data.component';
import { SortIndexPipe } from "../../_common/pipes/sort-index.pipe";
import { TypeColorPipe } from "../../_common/pipes/type-color.pipe";
import { PokemonNamePipe } from "../../_common/pipes/pokemon-name.pipe";


@NgModule({
  declarations: [
    PokemonDataComponent,
    SortIndexPipe,
    TypeColorPipe,
    PokemonNamePipe
  ],
  imports: [
    PokemonDataRoutingModule,
    NativeScriptCommonModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class PokemonDataModule { }
