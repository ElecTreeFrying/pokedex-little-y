import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { BehaviorSubject } from 'rxjs';
import * as Chance from 'chance';

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {

  private _id: number;
  berryObserve = new BehaviorSubject<any>(null);

  private pokemonSpriteURL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'

  constructor(private http: HttpClient) { }

  set id(id: any) { this._id = id; }
  get id() { return this._id; }

  counter: number = 0;
  increase() { return this.counter++; }
  getCounter() { return this.counter; }

  get homeData() {
    this.counter = 0;
    return this.http.get('https://pokeapi.co/api/v2/pokedex/1/').pipe(
      map((e) => e['pokemon_entries']),
      map((pokemon_entries: any[]) => {
        return pokemon_entries.map((pokemon) => {
          const id = pokemon['entry_number']
          pokemon['entry_number'] = `#${id}`
          pokemon['name'] = pokemon['pokemon_species']['name'];
          pokemon['image'] = this.pokemonSpriteURL + id + '.png';
          delete pokemon['pokemon_species'];
          return pokemon;
        });
      })
    )
  }

  get pokedexData() {
    this.counter = 0;
    return this.http.get('https://pokeapi.co/api/v2/pokedex/').pipe(
      map((e) => e['results']),
      map((results: any[]) => {
        return results.map((pokedex: any) => {
          const name = pokedex['name'].split('-').join(' ');
          pokedex['name'] = name.split(' ').map((a: string) => 
            a[0].toUpperCase() + a.slice(1)).join(' ');
          pokedex['id'] = pokedex['url'].split('/').reverse()[1];
          delete pokedex['url'];
          return pokedex;
        })
      })
    );
  }
  
  get pokemonData() {
    this.counter = 0;
    const exclude = [ 'unknown', 'shadow' ];
    return this.http.get('https://pokeapi.co/api/v2/type/').pipe(
      map((e) => e['results'].filter(a => !exclude.some((e) => e.includes(a['name'])))),
      map((results: any[]) => {
        return results.map((type: any) => {
          const name = type['name'];
          const id = type['url'].split('/').reverse()[1];
          return { name, id };
        })
      })
      );
    }
    
  get generationData() {
    this.counter = 0;
    return this.http.get('https://pokeapi.co/api/v2/generation/').pipe(
      map((e) => e['results']),
      map((results: any[]) => {
        return results.map((generation: any) => {
          let name = generation['name'].split('-').join(' ');
          name = name.split(' ').map((a: string, i: number) =>{
            if (i === 0) {
              return a[0].toUpperCase() + a.slice(1)
            } else {
              return a.toUpperCase();
            }
          }).join(' ');
          const id = generation['url'].split('/').reverse()[1];
          return { name, id };
        })
      })
    );
  }
   
  sprite = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/';

  get berriesData() {
    this.counter = 0;
    return this.http.get('https://pokeapi.co/api/v2/berry?offset=0&limit=64').pipe(
      map((e) => e['results']),
      map((berries: any[]) => 
        berries.map((berry) => {
          let name = berry['name'];
          const id = berry['url'].split('/').reverse()[1];
          const image = `${this.sprite}${name}-berry.png`;
          name = `${name[0].toUpperCase()}${name.slice(1)}`;
          return { name, id, image };
        })
      )
    );
  }

  berryEntries(url: string) {
    const id = url.split('/').reverse()[1];
    
    return this.http.get(`https://pokeapi.co/api/v2/item/${id}/`).pipe(
      map((item) => {
        
        const length0 = item['effect_entries'].filter(e => e.language.name === 'en').length - 1;
        const chance0 = new Chance();
        const randomInt0 = chance0.integer({ min: 0, max: length0 });
        const effect_entries = item['effect_entries'].filter(e => e.language.name === 'en')[randomInt0];
        const effect_entriesData = item['effect_entries'].filter(e => e.language.name === 'en');

        const length1 = item['flavor_text_entries'].filter(e => e.language.name === 'en').length - 1;
        const chance1 = new Chance();
        const randomInt1 = chance1.integer({ min: 0, max: length1 });
        const flavor_text_entries = item['flavor_text_entries'].filter(e => e.language.name === 'en')[randomInt1];
        const flavor_text_entriesData = item['flavor_text_entries'].filter(e => e.language.name === 'en');

        return { 
          effect_entries,
          effect_entriesData,
          flavor_text_entries,
          flavor_text_entriesData  
        };
      })
    );
  }
  
}
