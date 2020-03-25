import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { PokedexDataResolve } from "./_common/resolvers/pokedex-data.resolve";
import { TypeDataResolve } from "./_common/resolvers/type-data.resolve";
import { GenerationDataResolve } from "./_common/resolvers/generation-data.resolve";
import { BerryDataResolve } from "./_common/resolvers/berry-data.resolve";

const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "home", loadChildren: () => import("~/app/pages/home/home.module").then((m) => m.HomeModule) },
  { path: "pokedex", loadChildren: () => import("~/app/pages/pokedex/pokedex.module").then((m) => m.PokedexModule) },
  { path: "pokemon", loadChildren: () => import("~/app/pages/pokemon/pokemon.module").then((m) => m.PokemonModule) },
  { path: "generation", loadChildren: () => import("~/app/pages/generation/generation.module").then((m) => m.GenerationModule) },
  { path: "berries", loadChildren: () => import("~/app/pages/berries/berries.module").then((m) => m.BerriesModule) },
  { 
    path: "pokedex-data", 
    loadChildren: () => import("~/app/sub-pages/pokedex-data/pokedex-data.module").then((m) => m.PokedexDataModule),
    resolve: { resolve: PokedexDataResolve }
  },
  { 
    path: "type-data", 
    loadChildren: () => import("~/app/sub-pages/type-data/type-data.module").then((m) => m.TypeDataModule),
    resolve: { resolve: TypeDataResolve }
  },
  { 
    path: "generation-data", 
    loadChildren: () => import("~/app/sub-pages/generation-data/generation-data.module").then((m) => m.GenerationDataModule),
    resolve: { resolve: GenerationDataResolve }
  },
  { 
    path: "berry-data", 
    loadChildren: () => import("~/app/sub-pages/berry-data/berry-data.module").then((m) => m.BerryDataModule),
    resolve: { resolve: BerryDataResolve }
  }
];

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
