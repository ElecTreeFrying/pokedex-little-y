import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { ActivatedRoute } from '@angular/router';
import { ScrollEventData } from 'tns-core-modules/ui/scroll-view/scroll-view';

import { PokeObjectService } from "../../_common/services/poke-object.service";


@Component({
  selector: 'ns-pokemon-data',
  templateUrl: './pokemon-data.component.html',
  styleUrls: ['./pokemon-data.component.scss']
})
export class PokemonDataComponent implements OnInit {

  isScrolled: boolean = true;
  pokemon: any;
  color: any;
  border: any;
  show: any = { '0': false, '1': false, '2': false,'3': false, '4': false, '5': false };

  constructor(
    public router: RouterExtensions,
    private route: ActivatedRoute,
    private object: PokeObjectService
  ) { }
  
  ngOnInit(): void {
    this.pokemon = this.route.snapshot.data['resolve'];
    this.pokemon['abilities'] = this.object.abilities(this.pokemon['abilities']);
    this.pokemon['moves'] = this.object.moves(this.pokemon['moves']);
    this.pokemon['species'] = this.object.species(this.pokemon['species']);
    this.pokemon['sprite'] = this.object.image(this.pokemon['url']);
  }

  onScroll(event: ScrollEventData) {
    this.isScrolled = event.scrollY === 0 ? false : true;
  }

  toggle(item: number) {
    this.show[item] = !this.show[item];
  }

}
