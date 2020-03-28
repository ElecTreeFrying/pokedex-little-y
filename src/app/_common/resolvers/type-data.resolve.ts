import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { map } from 'rxjs/operators'

import { PokeApiService } from "../services/poke-api.service";

@Injectable({
  providedIn: 'root'
})
export class TypeDataResolve implements Resolve<any> {
  
  sprite = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';

  constructor(
    private http: HttpClient,
    private api: PokeApiService,
  ) {}

  resolve(next: ActivatedRouteSnapshot,state: RouterStateSnapshot): any {

    const id = this.api.id;
    return this.http.get(`https://pokeapi.co/api/v2/type/${id}`).pipe(
      map((type: any) => {
        const name = type['names'].find(e => e['language']['name'] === 'en').name;
        const damage_relations = type['damage_relations'];
        const pokemon = type['pokemon'].map((monster: any) => {
          let name = monster['pokemon']['name'];
          name = name[0].toUpperCase() + name.slice(1);
          const entry_number = +monster['pokemon']['url'].split('/').reverse()[1];
          const image = `${this.sprite}${entry_number}.png`;
          return { name, entry_number, image, id: entry_number }
        });
        return { name, pokemon, damage_relations };
      })
    );
  }
  
}
