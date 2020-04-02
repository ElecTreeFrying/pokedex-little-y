import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { ActivatedRoute } from '@angular/router';
import { ActionBar } from 'tns-core-modules/ui/action-bar';
import { ScrollView, ScrollEventData } from 'tns-core-modules/ui/scroll-view/scroll-view';
import { TextField } from 'tns-core-modules/ui/text-field';
import { AnimationCurve } from 'tns-core-modules/ui/enums/enums';
import { EventData } from 'tns-core-modules/data/observable';
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
  _pokemon: any[];
  textFieldActive: boolean = false;
  isShowActionItem: boolean;
  isLoading: boolean;
  isLoaded: boolean = false;
  textField: TextField;
  oldIndex = 15;
  newIndex = 0;

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
    this._pokemon = this.all.slice(0, 15);
    this.isShowActionItem = this.pokemon.description.length > 0;
  }

  onActionBarLoaded(event: EventData) {
    const object = <ActionBar>event.object;

    const overflowIcon = object.nativeView.getOverflowIcon();
    overflowIcon.setColorFilter(
      android.graphics.Color.parseColor('#FFFFFF'),
      android.graphics.PorterDuff.Mode.SRC_ATOP,
    );
  }

  loadAllPokemon() {
    this.pokemon['pokemon_entries'] = this.all;
    this._pokemon = this.all;
    this.isLoaded = true;
  }

  onTextChange(event: EventData) {
    const object = <TextField>event.object;
    const text = object.text;

    this.pokemon['pokemon_entries'] = this._pokemon.filter((e: any) => e['name'].includes(text));

    if (text.length > 0) {
      this.textFieldActive = true;
    } else {
      this.textFieldActive = false;
      this.pokemon['pokemon_entries'] = this._pokemon;
    }
  }

  onBlur(event: EventData) {
    this.textField.text = '';
    if (this.isLoaded) return;
    this.pokemon['pokemon_entries'] = this._pokemon;
  }

  onLoaded(event: EventData) {
    const object = <TextField>event.object;
    this.textField = object;
  }

  toPokemon(pokemon: any) {
    this.textField.text = '';
    this.api.id.pokeId = pokemon['id'];
    this.router.navigate(['/', 'pokemon-data'], {
      animated: true,
      transition: {
        name: 'slide',
        curve: AnimationCurve.cubicBezier(1,0,.5,1),
        duration: 500
      }
    });
  }

  onScroll(event: ScrollEventData) {

    if (this.textFieldActive || this.isLoaded) return;

    const scroll = <ScrollView>event.object;
    const refY = event.scrollY;
    const maxY = scroll.scrollableHeight;

    this.newIndex = this.oldIndex + 30;

    if (maxY === refY) {
      const newEntries = this.all.slice(this.oldIndex, this.newIndex);
      this.pokemon['pokemon_entries'] = this.pokemon['pokemon_entries'].concat(newEntries);
      this._pokemon = this.pokemon['pokemon_entries'].concat(newEntries);
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


