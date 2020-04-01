import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { ActivatedRoute } from '@angular/router';
import { EventData } from 'tns-core-modules/data/observable';
import { ActionBar } from 'tns-core-modules/ui/action-bar';
import { ScrollView, ScrollEventData } from 'tns-core-modules/ui/scroll-view/scroll-view';
import { AnimationCurve } from 'tns-core-modules/ui/enums/enums';
import { alert } from 'tns-core-modules/ui/dialogs';

import { PokeApiService } from "../../_common/services/poke-api.service";
import { DexObjectService } from "../../_common/services/dex-object.service";


@Component({
  selector: 'ns-pokedex-data',
  templateUrl: './pokedex-data.component.html',
  styleUrls: ['./pokedex-data.component.scss']
})
export class PokedexDataComponent implements OnInit {

  all: any;
  pokemon: any;
  isShowActionItem: boolean;
  isLoading: boolean;

  constructor(
    public router: RouterExtensions,
    private route: ActivatedRoute,
    private api: PokeApiService,
    private object: DexObjectService
  ) { }

  ngOnInit(): void {
    this.pokemon = this.route.snapshot.data['resolve'];
    this.pokemon['description'] = this.object.description(this.pokemon['description']);
    this.pokemon['name'] = this.object.names(this.pokemon['name']);
    this.all = this.object.pokemonSpecies(this.pokemon['pokemon_entries']);
    this.pokemon['pokemon_entries'] = this.all.slice(0, 15);
    this.isShowActionItem = this.pokemon.description.length > 0;
  }

  toPokemon(pokemon: any) {
    this.api.id.pokeId = pokemon['id'];
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

  onActionBarLoaded(event: EventData) {
    const object = <ActionBar>event.object;

    const overflowIcon = object.nativeView.getOverflowIcon();
    overflowIcon.setColorFilter(
      android.graphics.Color.parseColor('#FFFFFF'),
      android.graphics.PorterDuff.Mode.SRC_ATOP,
    );
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
      this.pokemon['pokemon_entries'] = this.pokemon['pokemon_entries'].concat(newEntries);
      this.oldIndex = this.newIndex;
      this.isLoading = true;
    } else {
      this.isLoading = false;
    }

    if (maxY === refY && this.all.length === this.pokemon['pokemon_entries'].length) {
      this.isLoading = false;
    }
  }

  moreDetails(description: string) {
    alert({
      title: `Pokédex`,
      message: description.replace('dex', 'pokédex').replace('—', ' — ') + '.',
      okButtonText: 'Done',
      cancelable: true
    })
  }

}


