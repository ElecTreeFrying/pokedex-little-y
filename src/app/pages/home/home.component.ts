import { Component, OnInit } from "@angular/core";
import * as app from "tns-core-modules/application";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { ActivatedRoute } from '@angular/router';
import { RouterExtensions } from 'nativescript-angular/router';
import { ScrollEventData, ScrollView } from "tns-core-modules/ui/scroll-view/scroll-view";
import { AnimationCurve } from 'tns-core-modules/ui/enums';

import { PokeApiService } from "../../_common/services/poke-api.service";


@Component({
  selector: "Home",
  templateUrl: "./home.component.html",
  styleUrls: [ './home.component.scss' ]
})
export class HomeComponent implements OnInit {

  all: any;
  pokemon: any;
  isLoading: boolean;

  constructor(
    private router: RouterExtensions, 
    private route: ActivatedRoute, 
    private api: PokeApiService
  ) { }

  ngOnInit() {
    this.all = this.route.snapshot.data['resolve'];
    this.pokemon = this.all.slice(0, 15);

    setTimeout(() => {
      // this.toPokemon(this.pokemon[0]);
    }, 1000);
  }

  toPokemon(pokemon: any) {
    this.api.id.pokeId = pokemon['id'];
    this.api.name = pokemon['name'].split('-')[0];
    console.log(['/', 'pokemon-data']);
    this.router.navigate(['/', 'pokemon-data'], {
      animated: true,
      transition: {
        name: 'slide',
        curve: AnimationCurve.cubicBezier(1,0,.5,1),
        duration: 500
      }
    });
  }

  oldIndex = 15;
  newIndex = 0;

  onScroll(event: ScrollEventData) {
    const scroll = <ScrollView>event.object;
    const refY = event.scrollY;
    const maxY = scroll.scrollableHeight;

    this.newIndex = this.oldIndex + 30;

    if (maxY === refY) {
      const newEntries = this.all.slice(this.oldIndex, this.newIndex);
      this.pokemon = this.pokemon.concat(newEntries);
      this.oldIndex = this.newIndex;
      this.isLoading = true;
    } else {
      this.isLoading = false;
    }

    if (maxY === refY && this.all.length === this.pokemon.length) {
      this.isLoading = false;
    }
  }
  
  onShow() {
    const drawer = <RadSideDrawer>app.getRootView();
    drawer.showDrawer();
  }

}
