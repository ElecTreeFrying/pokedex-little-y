import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { map } from 'rxjs/operators'

import { PokeApiService } from "../services/poke-api.service";

@Injectable({
  providedIn: 'root'
})
export class BerryDataResolve implements Resolve<any> {
  
  sprite = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/';

  constructor(
    private http: HttpClient,
    private api: PokeApiService,
  ) {}

  resolve(next: ActivatedRouteSnapshot,state: RouterStateSnapshot): any {

    const id = this.api.id;
    return this.http.get(`https://pokeapi.co/api/v2/berry/${id}`).pipe(
      map((berry: any) => {
        
        berry['flavors'].map((flavor) => {
          flavor['name'] = flavor['flavor']['name'];
          delete flavor['flavor'];
          return flavor;
        });
        berry['image'] = `${this.sprite}${berry['item']['name']}.png`;

        return berry;
      })
    );
  }
  
}
