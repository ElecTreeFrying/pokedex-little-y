import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from 'nativescript-angular/router';
import * as app from "tns-core-modules/application";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";

import { PokeApiService } from "../../_common/services/poke-api.service";

@Component({
  selector: 'ns-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss']
})
export class PokemonComponent implements OnInit {

  pokemon: any;

  constructor(
    private router: RouterExtensions,
    private api: PokeApiService
  ) { }
  
  ngOnInit(): void {
    this.pokemon = this.api.pokemonData;
  }

  navigate(item) {
    this.api.id = item['id'];
    this.router.navigate(['type-data']);
  }

  onShow() {
    const drawer = <RadSideDrawer>app.getRootView();
    drawer.showDrawer();
  }
  
}
