import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from 'nativescript-angular/router';
import * as app from "tns-core-modules/application";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { AnimationCurve } from 'tns-core-modules/ui/enums';

import { PokeApiService } from "../../_common/services/poke-api.service";

@Component({
  selector: 'ns-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss']
})
export class PokedexComponent implements OnInit {

  pokedex: any;
  
  constructor(
    private router: RouterExtensions,
    private api: PokeApiService
    ) { }
  
  ngOnInit() {
    this.pokedex = this.api.pokedexData;
  }

  navigate(item) {
    this.api.id.dexId = item['id'];
    console.log(['/', 'pokedex-data']);
    this.router.navigate(['/', 'pokedex-data'], {
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
