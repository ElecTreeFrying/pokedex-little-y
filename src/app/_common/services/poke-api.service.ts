import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import * as _ from 'lodash';

export const color = {
  default: {
    bug: 'A8B820', dark: '705848', dragon: '7038F8', electric: 'F8D030', fairy: 'EE99AC',
    fighting: 'C03028', fire: 'F08030', flying: 'A890F0', ghost: '705898', grass: '78C850',
    ground: 'E0C068', ice: '98D8D8', normal: 'A8A878', poison: 'A040A0', psychic: 'F85888',
    rock: 'B8A038', steel: 'B8B8D0', water: '6890F0'
  },
  light: {
    bug: 'C6D16E', dark: 'A29288', dragon: 'A27DFA', electric: 'FAE078', fairy: 'F4BDC9',
    fighting: 'D67873', fire: 'F5AC78', flying: 'C6B7F5', ghost: 'A292BC', grass: 'A7DB8D',
    ground: 'EBD69D', ice: 'BCE6E6', normal: 'C6C6A7', poison: 'C183C1', psychic: 'FA92B2',
    rock: 'D1C17D', steel: 'D1D1E0', water: '9DB7F5'
  },
  dark: {
    bug: '6D7815', dark: '49392F', dragon: '4924A1', electric: 'A1871F', fairy: '9B6470',
    fighting: '7D1F1A', fire: '9C531F', flying: '6D5E9C', ghost: '493963', grass: '4E8234',
    ground: '927D44', ice: '638D8D', normal: '6D6D4E', poison: '682A68', psychic: 'A13959',
    rock: '786824', steel: '787887', water: '445E9C'
  }
}

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {

  private _id: number;

  private pokemonSpriteURL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'

  constructor(private http: HttpClient) { }

  set id(id: number) { this._id = id; }
  get id() { return this._id; }

  counter: number = 0;
  increase() { return this.counter++; }
  getCounter() { return this.counter; }

  get homeData() {
    this.counter = 0;
    return this.http.get('https://pokeapi.co/api/v2/pokedex/2/').pipe(
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

  berryEntries(id: number) {
    return this.http.get(`https://pokeapi.co/api/v2/item/${id}/`).pipe(
      map((item) => {

        const effect_entries = item['effect_entries']
          .filter(e => e.language.name === 'en')
          .map((entry: any) => {
            entry['effect'] = entry['effect']
              .replace(/  +/g, ' ').replace(/\s\s+/g, ' ')
              .replace(/\n/g, ' ').replace(/ :/g, ':');
            delete entry['language'];
            return entry;
          })[0];
          
        // Fuck this shit im sorry for this baby shit code.
        let flavor_text_entries = item['flavor_text_entries']
          .filter(e => e.language.name === 'en')
          .map((entry: any) => {
            entry['language'] = entry['language']['name'];
            entry['text'] = entry['text'].replace(/\n/g, ' ');
            entry['id'] = +entry['version_group']['url'].split('/').reverse()[1];
            entry['version_group'] = entry['version_group']['name'];
            entry['version'] = 'Pokémon ' + entry['version_group']
              .replace('red-blue', 'red-and-blue')
              .replace('gold-silver', 'gold-and-silver')
              .replace('ruby-sapphire', 'ruby-and-sapphire')
              .replace('firered-leafgreen', 'fire-red-and-leafy-green')
              .replace('diamond-pearl', 'diamond-and-pearl')
              .replace('heartgold-soulsilver', 'heart-gold-and-soul-silver')
              .replace('black-white', 'black-and-white')
              .replace('black-2-white-2', 'black-2-and-white-2')
              .replace('x-y', 'x-and-y')
              .replace('omega-ruby-alpha-sapphire', 'omega-ruby-and-alpha-sapphire')
              .replace('sun-moon', 'sun-and-moon')
              .replace('ultra-sun-ultra-moon', 'ultra-sun-and-ultra-moon')
              .split('-')
              .map((a: string) => a[0].toUpperCase() + a.slice(1))
              .join(' ').replace('And', 'and') + ' Version';
            
            delete entry['language'];
            return entry;
          });
        
        flavor_text_entries = _.sortBy(flavor_text_entries, [ 'id' ])
        
        return { effect_entries, flavor_text_entries };
      })
    );
  }
  
}
