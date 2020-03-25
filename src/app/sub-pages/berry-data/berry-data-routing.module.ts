import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from 'nativescript-angular/router';

import { BerryDataComponent } from "./berry-data.component";

const routes: Routes = [
  { path: '', component: BerryDataComponent }
];

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule]
})
export class BerryDataRoutingModule { }
