import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { map } from 'rxjs/operators'

import { PokeApiService } from "../services/poke-api.service";

@Injectable({
  providedIn: 'root'
})
export class TypeDataResolve implements Resolve<any> {

  constructor(
    private http: HttpClient,
    private api: PokeApiService,
  ) {}

  resolve(next: ActivatedRouteSnapshot,state: RouterStateSnapshot): any {

    const id = this.api.id.typeId;
    return this.http.get(`https://pokeapi.co/api/v2/type/${id}`).pipe(
      map((type: any) => {
        const name = type['names'];
        const damage_relations = type['damage_relations'];
        const pokemon = type['pokemon'];
        return { name, pokemon, damage_relations };
      })
    );
  }
  
}
