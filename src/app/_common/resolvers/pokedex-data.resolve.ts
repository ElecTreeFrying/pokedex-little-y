import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { map } from 'rxjs/operators'

import { PokeApiService } from "../services/poke-api.service";

@Injectable({
  providedIn: 'root'
})
export class PokedexDataResolve implements Resolve<any> {
  
  sprite = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';

  constructor(
    private http: HttpClient,
    private api: PokeApiService,
  ) {}

  resolve(next: ActivatedRouteSnapshot,state: RouterStateSnapshot): any {

    const id = this.api.id;
    return this.http.get(`https://pokeapi.co/api/v2/pokedex/${id}`).pipe(
      map((pokedex: any) => {
        const description = pokedex['descriptions'].find(e => e['language']['name'] === 'en').description;
        const name = pokedex['names'].find(e => e['language']['name'] === 'en').name;
        const pokemon_entries = pokedex['pokemon_entries'].map((pokemon: any) => {
          const entry_number = pokemon['entry_number'];
          const name = pokemon['pokemon_species']['name'];
          const id = pokemon['pokemon_species']['url'].split('/').reverse()[1];
          const image = `${this.sprite}${id}.png`;
          return { name, id, image, entry_number };
        });
        return { description, name, pokemon_entries };
      })
    );
  }
  
}
