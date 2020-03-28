import { Injectable } from '@angular/core';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class GenObjectService {

  sprite = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';

  constructor() { }

  name(_names: any) {
    return _names.find(e => e['language']['name'] === 'en').name;
  }

  pokemonSpecies(_species): any {
    
    const pokemon_species = _species.map((pokemon: any) => {
      let name = pokemon['name'];
      name = name[0].toUpperCase() + name.slice(1);
      const entry_number = +pokemon['url'].split('/').reverse()[1];
      const image = `${this.sprite}${entry_number}.png`;
      return { name, entry_number, image, id: entry_number }
    });

    return _.sortBy(pokemon_species, ['entry_number']);
  }
}
