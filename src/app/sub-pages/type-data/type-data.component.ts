import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { ActivatedRoute } from '@angular/router';
import { ScrollView, ScrollEventData } from 'tns-core-modules/ui/scroll-view/scroll-view';

import { TypeObjectService } from "../../_common/services/type-object.service";

@Component({
  selector: 'ns-type-data',
  templateUrl: './type-data.component.html',
  styleUrls: ['./type-data.component.scss']
})
export class TypeDataComponent implements OnInit {
  
  all: any;
  types: any;

  constructor(
    public router: RouterExtensions,
    private route: ActivatedRoute,
    private object: TypeObjectService
  ) { }

  ngOnInit(): void {
    this.types = this.route.snapshot.data['resolve'];
    this.types['name'] = this.object.name(this.types['name']);
    this.all = this.object.pokemon(this.types['pokemon']);
    this.types['pokemon'] = this.all.slice(0, 15);
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
      this.types['pokemon'] = this.types['pokemon'].concat(newEntries);
      this.oldIndex = this.newIndex;
    }
  }

}
