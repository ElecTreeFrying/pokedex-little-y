import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from 'nativescript-angular/router';

import { GenerationDataComponent } from "./generation-data.component";

const routes: Routes = [
  { path: '', component: GenerationDataComponent }
];

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule]
})
export class GenerationDataRoutingModule { }
