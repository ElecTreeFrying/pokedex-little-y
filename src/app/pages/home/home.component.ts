import { Component, OnInit } from "@angular/core";
import * as app from "tns-core-modules/application";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { RouterExtensions } from 'nativescript-angular/router';
import { AnimationCurve } from 'tns-core-modules/ui/enums';

import { PokeApiService } from "../../_common/services/poke-api.service";

@Component({
  selector: "Home",
  templateUrl: "./home.component.html",
  styleUrls: [ './home.component.scss' ]
})
export class HomeComponent implements OnInit {

  pokemon: any;

  constructor(
    private router: RouterExtensions, 
    private api: PokeApiService
  ) { }

  ngOnInit() {
    this.pokemon = this.api.homeData;
  }

  toPokemon(pokemon: any) {
    this.api.id = pokemon['id'];
    this.api.lastRoute = 'home';
    this.router.navigate(['pokemon-data'], {
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
