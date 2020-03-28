import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { map } from 'rxjs/operators'

import { PokeApiService } from "../services/poke-api.service";

@Injectable({
  providedIn: 'root'
})
export class PokedexDataResolve implements Resolve<any> {
  
  constructor(
    private http: HttpClient,
    private api: PokeApiService,
  ) {}

  resolve(next: ActivatedRouteSnapshot,state: RouterStateSnapshot): any {

    const id = this.api.id;
    return this.http.get(`https://pokeapi.co/api/v2/pokedex/${id}`).pipe(
      map((pokedex: any) => {
        const description = pokedex['descriptions'];
        const name = pokedex['names'];
        const pokemon_entries = pokedex['pokemon_entries'];
        return { description, name, pokemon_entries };
      })
    );
  }
  
}
