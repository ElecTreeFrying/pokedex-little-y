import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { PokemonDataRoutingModule } from './pokemon-data-routing.module';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { PokemonDataComponent } from './pokemon-data.component';


@NgModule({
  declarations: [PokemonDataComponent],
  imports: [
    PokemonDataRoutingModule,
    NativeScriptCommonModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class PokemonDataModule { }
