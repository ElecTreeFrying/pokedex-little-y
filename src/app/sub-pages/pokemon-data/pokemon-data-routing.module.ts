import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from 'nativescript-angular/router';

import { PokemonDataComponent } from "./pokemon-data.component";


const routes: Routes = [
  { path: '', component: PokemonDataComponent }
];

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule]
})
export class PokemonDataRoutingModule { }
