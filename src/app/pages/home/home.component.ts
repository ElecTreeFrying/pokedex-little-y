import { Component, OnInit } from "@angular/core";
import * as app from "tns-core-modules/application";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { ActivatedRoute } from '@angular/router';
import { RouterExtensions } from 'nativescript-angular/router';
import { ScrollView, ScrollEventData } from 'tns-core-modules/ui/scroll-view/scroll-view';
import { TextField } from 'tns-core-modules/ui/text-field';
import { AnimationCurve } from 'tns-core-modules/ui/enums';
import { EventData } from "tns-core-modules/ui/page/page";

import { PokeApiService } from "../../_common/services/poke-api.service";


@Component({
  selector: "Home",
  templateUrl: "./home.component.html",
  styleUrls: [ './home.component.scss' ]
})
export class HomeComponent implements OnInit {

  all: any;
  pokemon: any[];
  _pokemon: any[];
  textFieldActive: boolean = false;
  isLoading: boolean;
  textField: TextField;
  oldIndex = 15;
  newIndex = 0;

  constructor(
    private router: RouterExtensions, 
    public route: ActivatedRoute, 
    private api: PokeApiService
  ) { }

  ngOnInit() {
    this.all = this.route.snapshot.data['resolve'];
    this.pokemon = this.all.slice(0, 15);
    this._pokemon = this.all.slice(0, 15);
  }

  onActionBarLoaded(event: EventData) {
    const object = <any>event.object;

    const overflowIcon = object.nativeView.getOverflowIcon();
    overflowIcon.setColorFilter(
      android.graphics.Color.parseColor('#FFFFFF'),
      android.graphics.PorterDuff.Mode.SRC_ATOP,
    );
  }

  loadAllPokemon() {
    this.pokemon = this.all;
    this._pokemon = this.all;
  }

  onTextChange(event: EventData) {
    const object = <TextField>event.object;
    const text = object.text;

    this.pokemon = this._pokemon.filter((e: any) => e['name'].includes(text));

    if (text.length > 0) {
      this.textFieldActive = true;
    } else {
      this.textFieldActive = false;
      this.pokemon = this._pokemon;
    }
  }

  onBlur(event: EventData) {
    this.pokemon = this._pokemon;
    this.textField.text = '';
  }

  onLoaded(event: EventData) {
    const object = <TextField>event.object;
    this.textField = object;
  }

  toPokemon(pokemon: any) {
    this.textField.text = '';
    this.api.id.pokeId = pokemon['id'];
    this.api.name = pokemon['name'].split('-')[0];
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

    if (this.textFieldActive) return;

    const scroll = <ScrollView>event.object;
    const refY = event.scrollY;
    const maxY = scroll.scrollableHeight;

    this.newIndex = this.oldIndex + 30;

    if (maxY === refY) {
      const newEntries = this.all.slice(this.oldIndex, this.newIndex);
      this.pokemon = this.pokemon.concat(newEntries);
      this._pokemon = this.pokemon.concat(newEntries);
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
