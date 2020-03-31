import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DexObjectService {

  sprite = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';

  constructor() { }

  description(_descriptions: any) {
    return _descriptions.find(e => e['language']['name'] === 'en').description;
  }

  names(_names: any) {
    return _names.find(e => e['language']['name'] === 'en').name;
  }

  pokemonSpecies(_species: any) {
    return _species.map((pokemon: any) => {
      const entry_number = pokemon['entry_number'];
      const name = pokemon['pokemon_species']['name'];
      const id = +pokemon['pokemon_species']['url'].split('/').reverse()[1];
      const image = `${this.sprite}${id}.png`;
      return { name, id, image, entry_number };
    });
  }

}
