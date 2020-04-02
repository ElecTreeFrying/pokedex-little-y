import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { ActivatedRoute } from '@angular/router';
import { ScrollView, ScrollEventData } from 'tns-core-modules/ui/scroll-view/scroll-view';
import { AnimationCurve } from 'tns-core-modules/ui/enums/enums';

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
  isLoading: boolean;

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
    this.types['pokemon'] = this.all.slice(0, 15);
  }

  toPokemon(pokemon: any) {
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

  oldIndex = 15;
  newIndex = 0;

  onScroll(event: ScrollEventData) {
    const scroll = <ScrollView>event.object;
    const refY = event.scrollY;
    const maxY = scroll.scrollableHeight;

    this.newIndex = this.oldIndex + 30;

    if (maxY === refY) {
      const newEntries = this.all.slice(this.oldIndex, this.newIndex);
      this.types['pokemon'] = this.types['pokemon'].concat(newEntries);
      this.oldIndex = this.newIndex;
      this.isLoading = true;
    } else {
      this.isLoading = false;
    }

    if (maxY === refY && this.all.length === this.types['pokemon'].length) {
      this.isLoading = false;
    }
  }

}
