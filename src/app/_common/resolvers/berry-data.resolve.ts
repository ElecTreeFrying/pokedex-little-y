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

    const id = this.api.id.berryId;
    return this.http.get(`https://pokeapi.co/api/v2/berry/${id}`).pipe(
      map((berry: any) => {
        
        const firmness = berry['firmness']['name'];
        berry['size'] = +berry['size'] / 10;

        berry['image'] = `${this.sprite}${berry['item']['name']}.png`;
        berry['firmness'] = `${firmness[0].toUpperCase()}${firmness.slice(1)}`.replace('-', ' ');
        berry['item_id'] = +berry['item']['url'].split('/').reverse()[1];

        delete berry['item'];
        delete berry['natural_gift_type'];
        delete berry['natural_gift_power'];
        delete berry['id'];

        return berry;
      })
    );
  }
  
}
