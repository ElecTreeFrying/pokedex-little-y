import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TypeObjectService {
  
  sprite = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';

  constructor() { }

  name(_names: any) {
    return _names.find(e => e['language']['name'] === 'en').name;
  }

  pokemon(_pokemon: any) {
    return _pokemon.map((monster: any) => {
      let name = monster['pokemon']['name'];
      name = name[0].toUpperCase() + name.slice(1);
      const entry_number = +monster['pokemon']['url'].split('/').reverse()[1];
      const image = `${this.sprite}${entry_number}.png`;
      return { name, entry_number, image, id: entry_number }
    });
  }

}
