import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TypeObjectService {
  
  sprite = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';

  constructor(private http: HttpClient) { }

  name(_names: any) {
    return _names.find(e => e['language']['name'] === 'en').name;
  }

  pokemon(_pokemon: any) {
    return _pokemon.map((monster: any) => {
      let name = monster['pokemon']['name'].split('-').join(' ');
      name = name[0].toUpperCase() + name.slice(1);
      name = name.split('-').join(' ')
      const entry_number = +monster['pokemon']['url'].split('/').reverse()[1];
      if (entry_number === 772) {
        name = 'Type: Null';
      }
      return { name, entry_number, image: this.image(monster['pokemon']['url']), id: entry_number }
    });
  }

  private image(_url: any) {
    return this.http.get(_url).pipe(
      map((monster) => {
      const entry_number = +monster['id'];
      if (entry_number < 10091) {
        return `${this.sprite}${entry_number}.png`;
      } else {
        let _name: string;
        if (monster['name'] === 'mr-mime') {
        _name = monster['name'].split('-').slice(2).join('-');
        } else {
          _name = monster['name'].split('-').slice(1).join('-');
        }
        const entry_number = +monster['species']['url'].split('/').reverse()[1];
        if (entry_number === 784) {
          _name = monster['name'].split('-').slice(1).join('-').slice(2);
          return `${this.sprite}${entry_number}-${_name}.png`;
        } else {
          return `${this.sprite}${entry_number}-${_name}.png`;
        }
      }
      })
    )
  }

}
