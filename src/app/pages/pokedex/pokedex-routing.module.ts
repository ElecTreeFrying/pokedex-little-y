import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from 'nativescript-angular/router';

import { PokedexComponent } from "./pokedex.component";

const routes: Routes = [
  { path: '', component: PokedexComponent }
];

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule]
})
export class PokedexRoutingModule { }
