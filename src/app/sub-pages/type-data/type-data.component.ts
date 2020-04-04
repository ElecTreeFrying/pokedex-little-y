import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { ActivatedRoute } from '@angular/router';
import { ActionBar } from 'tns-core-modules/ui/action-bar';
import { ScrollView, ScrollEventData } from 'tns-core-modules/ui/scroll-view/scroll-view';
import { TextField } from 'tns-core-modules/ui/text-field';
import { AnimationCurve } from 'tns-core-modules/ui/enums/enums';
import { EventData } from 'tns-core-modules/data/observable';

import { PokeApiService } from "../../_common/services/poke-api.service";
import { TypeObjectService } from "../../_common/services/type-object.service";


@Component({
  selector: 'ns-type-data',
  templateUrl: './type-data.component.html',
  styleUrls: ['./type-data.component.scss']
})
export class TypeDataComponent implements OnInit {
  
  all: any;
  types: any;
  _types: any[];
  textFieldActive: boolean = false;
  isLoading: boolean;
  isNavigating: boolean = false;
  isLoaded: boolean = false;
  textField: TextField;
  indexIncrement= 10;
  oldIndex = 10;
  newIndex = 0;

  constructor(
    public router: RouterExtensions,
    private route: ActivatedRoute,
    private api: PokeApiService,
    private object: TypeObjectService
  ) { }

  ngOnInit(): void {
    this.types = this.route.snapshot.data['resolve'];
    this.types['name'] = this.object.name(this.types['name']);
    this.all = this.object.pokemon(this.types['pokemon']);
    this.types['pokemon'] = this.all.slice(0, this.oldIndex);
    this._types = this.all.slice(0, this.oldIndex);
  }

  onActionBarLoaded(event: EventData) {
    this.isNavigating = false;
    const object = <ActionBar>event.object;

    const overflowIcon = object.nativeView.getOverflowIcon();
    overflowIcon.setColorFilter(
      android.graphics.Color.parseColor('#FFFFFF'),
      android.graphics.PorterDuff.Mode.SRC_ATOP,
    );
  }

  loadAllPokemon() {
    this.types['pokemon'] = this.all;
    this._types = this.all;
    this.isLoaded = true;
  }

  onTextChange(event: EventData) {
    this.textField = <TextField>event.object;
    const text = this.textField.text.toLowerCase();

    this.types['pokemon'] = this._types.filter((e: any) => e['name'].includes(text));

    if (text.length > 0) {
      this.textFieldActive = true;
    } else {
      this.textFieldActive = false;
      this.types['pokemon'] = this._types;
    }
  }

  onBlur(event: EventData) {
    this.textFieldActive ? this.textField.text = '' : 0;
  }

  toPokemon(pokemon: any) {
    this.isNavigating = true;
    this.textFieldActive ? this.textField.text = '' : 0;
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

    if (this.textFieldActive || this.isLoaded || this.isNavigating) return;

    const scroll = <ScrollView>event.object;
    const refY = event.scrollY;
    const maxY = scroll.scrollableHeight;

    this.newIndex = this.oldIndex + this.indexIncrement;

    if (maxY === refY) {
      const newEntries = this.all.slice(this.oldIndex, this.newIndex);
      this.types['pokemon'] = this.types['pokemon'].concat(newEntries);
      this._types = this._types.concat(newEntries);
      this.oldIndex = this.newIndex;
      this.isLoading = true;
    } else {
      this.isLoading = false;
    }

    if (maxY === refY && this.all.length === this._types.length) {
      this.isLoading = false;
    }
  }

}
