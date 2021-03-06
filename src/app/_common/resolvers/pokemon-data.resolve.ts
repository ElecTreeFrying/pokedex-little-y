import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { map } from 'rxjs/operators'

import { PokeApiService } from "../services/poke-api.service";

@Injectable({
  providedIn: 'root'
})
export class PokemonDataResolve implements Resolve<any> {
  
  constructor(
    private http: HttpClient,
    private api: PokeApiService,
  ) {}

  resolve(next: ActivatedRouteSnapshot,state: RouterStateSnapshot): any {

    const id = this.api.id.pokeId;
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    return this.http.get(url).pipe(
      map((pokemon: any) => {
        
        pokemon['height'] = `${+pokemon['height'] * 10} cm`;
        pokemon['weight'] = `${+pokemon['weight'] * 100} g`;

        pokemon['stats'] = pokemon['stats'].map((stat) => {
          stat['stat'] = stat['stat']['name'];
          return stat;
        });
        
        pokemon['types'] = pokemon['types'].map((type) => {
          type['type'] = type['type']['name']
          return type;
        });

        pokemon['url'] = url;
        
        delete pokemon['forms'];
        delete pokemon['game_indices'];
        delete pokemon['held_items']
        delete pokemon['is_default']
        delete pokemon['location_area_encounters']
        delete pokemon['sprites']['back_female']
        delete pokemon['sprites']['back_shiny_female']
        delete pokemon['sprites']['front_female']
        delete pokemon['sprites']['front_shiny_female ']

        return pokemon;
      })
    );
  }
  
}
