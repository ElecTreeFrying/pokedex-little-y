import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from 'nativescript-angular/router';

import { PokemonComponent } from "./pokemon.component";

const routes: Routes = [
  { path: '', component: PokemonComponent }
];

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule]
})
export class PokemonRoutingModule { }



