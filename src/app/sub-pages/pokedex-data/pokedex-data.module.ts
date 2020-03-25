import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { PokedexDataRoutingModule } from './pokedex-data-routing.module';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { PokedexDataComponent } from './pokedex-data.component';


@NgModule({
  declarations: [PokedexDataComponent],
  imports: [
    PokedexDataRoutingModule,
    NativeScriptCommonModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class PokedexDataModule { }
