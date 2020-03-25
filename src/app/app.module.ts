import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";
import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular";

import { AppRoutingModule } from "./app-routing.module";

import { AppComponent } from "./app.component";

import { PokedexDataResolve } from "./_common/resolvers/pokedex-data.resolve";

@NgModule({
  bootstrap: [
    AppComponent
  ],
  imports: [
    NativeScriptModule,
    NativeScriptHttpClientModule,
    NativeScriptUISideDrawerModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    PokedexDataResolve
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class AppModule { }
