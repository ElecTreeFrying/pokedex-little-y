import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from 'nativescript-angular/router';

import { PokedexDataComponent } from "./pokedex-data.component";

const routes: Routes = [
  { path: '', component: PokedexDataComponent }
];

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule]
})
export class PokedexDataRoutingModule { }
