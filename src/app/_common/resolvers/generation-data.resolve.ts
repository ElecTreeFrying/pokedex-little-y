import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { map } from 'rxjs/operators'
import * as _ from 'lodash';

import { PokeApiService } from "../services/poke-api.service";

@Injectable({
  providedIn: 'root'
})
export class GenerationDataResolve implements Resolve<any> {
  
  sprite = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';

  constructor(
    private http: HttpClient,
    private api: PokeApiService,
  ) {}

  resolve(next: ActivatedRouteSnapshot,state: RouterStateSnapshot): any {

    const id = this.api.id;
    return this.http.get(`https://pokeapi.co/api/v2/generation/${id}`).pipe(
      map((generation: any) => {
        const name = generation['names'].find(e => e['language']['name'] === 'en').name;
        let pokemon_species = generation['pokemon_species'].map((pokemon: any) => {
          let name = pokemon['name'];
          name = name[0].toUpperCase() + name.slice(1);
          const entry_number = +pokemon['url'].split('/').reverse()[1];
          const image = `${this.sprite}${entry_number}.png`;
          return { name, entry_number, image, id: entry_number }
        });
        pokemon_species = _.sortBy(pokemon_species, ['entry_number']);
        return { name, pokemon_species };
      })
    );
  }
  
}
