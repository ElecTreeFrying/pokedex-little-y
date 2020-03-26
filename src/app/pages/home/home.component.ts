import { Component, OnInit } from "@angular/core";
import * as app from "tns-core-modules/application";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";

import { PokeApiService } from "../../_common/services/poke-api.service";

@Component({
  selector: "Home",
  templateUrl: "./home.component.html",
  styleUrls: [ './home.component.scss' ]
})
export class HomeComponent implements OnInit {

  pokemon: any;

  constructor(
    private api: PokeApiService
  ) { }

  ngOnInit() {
    this.pokemon = this.api.homeData;
  }

  toPokemon(pokemon: any) {
    console.log('pokemon selected →', pokemon);
  }
  
  onShow() {
    const drawer = <RadSideDrawer>app.getRootView();
    drawer.showDrawer();
  }

}
