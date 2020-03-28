import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { map } from 'rxjs/operators'

import { PokeApiService } from "../services/poke-api.service";

@Injectable({
  providedIn: 'root'
})
export class GenerationDataResolve implements Resolve<any> {
  
  constructor(
    private http: HttpClient,
    private api: PokeApiService,
  ) {}

  resolve(next: ActivatedRouteSnapshot,state: RouterStateSnapshot): any {

    const id = this.api.id;
    return this.http.get(`https://pokeapi.co/api/v2/generation/${id}`).pipe(
      map((generation: any) => {
        const name = generation['names'];
        let pokemon_species = generation['pokemon_species'];
        return { name, pokemon_species };
      })
    );
  }
  
}
