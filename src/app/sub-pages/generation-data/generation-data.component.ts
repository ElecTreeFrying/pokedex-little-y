import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { ActivatedRoute } from '@angular/router';
import { ScrollView, ScrollEventData } from 'tns-core-modules/ui/scroll-view/scroll-view';

import { GenObjectService } from "../../_common/services/gen-object.service";

@Component({
  selector: 'ns-generation-data',
  templateUrl: './generation-data.component.html',
  styleUrls: ['./generation-data.component.scss']
})
export class GenerationDataComponent implements OnInit {
  
  all: any;
  generation: any;

  constructor(
    public router: RouterExtensions,
    private route: ActivatedRoute,
    private object: GenObjectService
  ) { }

  ngOnInit(): void {
    this.generation = this.route.snapshot.data['resolve'];
    this.generation['name'] = this.object.name(this.generation['name']);
    this.all = this.object.pokemonSpecies(this.generation['pokemon_species']);
    this.generation['pokemon_species'] = this.all.slice(0, 15);
  }

  toPokemon(pokemon: any) {
    console.log('pokemon selected →', pokemon);
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
      this.generation['pokemon_species'] = this.generation['pokemon_species'].concat(newEntries);
      this.oldIndex = this.newIndex;
    }
  }

}
