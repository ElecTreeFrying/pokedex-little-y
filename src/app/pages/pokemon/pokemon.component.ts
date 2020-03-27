import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from 'nativescript-angular/router';
import * as app from "tns-core-modules/application";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { AnimationCurve } from 'tns-core-modules/ui/enums';

import { PokeApiService, color } from "../../_common/services/poke-api.service";

@Component({
  selector: 'ns-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss']
})
export class PokemonComponent implements OnInit {

  pokemon: any;
  color: any;

  constructor(
    private router: RouterExtensions,
    private api: PokeApiService
  ) { 
    this.color = color;    
  }
  
  ngOnInit(): void {
    this.pokemon = this.api.pokemonData;
  }

  navigate(item) {
    this.api.id = item['id'];
    this.router.navigate(['type-data'], {
      animated: true,
      transition: {
        name: 'slide',
        curve: AnimationCurve.cubicBezier(1,0,.5,1),
        duration: 500
      }
    });
  }

  onShow() {
    const drawer = <RadSideDrawer>app.getRootView();
    drawer.showDrawer();
  }

}
