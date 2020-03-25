import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from 'nativescript-angular/router';

import { TypeDataComponent } from "./type-data.component";

const routes: Routes = [
  { path: '', component: TypeDataComponent }
];

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule]
})
export class TypeDataRoutingModule { }
