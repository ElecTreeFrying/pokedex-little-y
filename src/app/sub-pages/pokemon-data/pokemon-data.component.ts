import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { ActivatedRoute } from '@angular/router';
import { AnimationCurve } from 'tns-core-modules/ui/enums';

import { PokeApiService } from "../../_common/services/poke-api.service";
import { PokeObjectService } from "../../_common/services/poke-object.service";


@Component({
  selector: 'ns-pokemon-data',
  templateUrl: './pokemon-data.component.html',
  styleUrls: ['./pokemon-data.component.scss']
})
export class PokemonDataComponent implements OnInit {

  pokemon: any;

  constructor(
    public router: RouterExtensions,
    private route: ActivatedRoute,
    private api: PokeApiService,
    private object: PokeObjectService
  ) { }

  ngOnInit(): void {
    this.pokemon = this.route.snapshot.data['resolve'];
    this.pokemon['abilities'] = this.object.abilities(this.pokemon['abilities']);
    this.pokemon['moves'] = this.object.moves(this.pokemon['moves']);
    this.pokemon['species'] = this.object.species(this.pokemon['species']);
  }

  back() {
    this.router.navigate([ this.api.lastRoute ], {
      animated: true,
      transition: {
        name: 'slideRight',
        curve: AnimationCurve.cubicBezier(1,0,.5,1),
        duration: 500
      }
    });
  }

}
