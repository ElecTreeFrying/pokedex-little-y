import { Component, OnInit, OnDestroy } from "@angular/core";
import { RouterExtensions } from 'nativescript-angular/router';
import * as app from "tns-core-modules/application";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";

import { PokeApiService } from "../../_common/services/poke-api.service";

@Component({
  selector: 'ns-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss']
})
export class PokedexComponent implements OnInit, OnDestroy {

  pokedex: any;
  
  constructor(
    private router: RouterExtensions,
    private api: PokeApiService
    ) { }
  
  ngOnInit() {
    this.pokedex = this.api.pokedexData;
  }

  ngOnDestroy() {
  }

  navigate(item) {
    this.api.id = item['id'];
    this.router.navigate(['pokedex-data']);
  }

  onShow() {
    const drawer = <RadSideDrawer>app.getRootView();
    drawer.showDrawer();
  }

  
  
}