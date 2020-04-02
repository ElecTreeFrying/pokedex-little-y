import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pokemonName'
})
export class PokemonNamePipe implements PipeTransform {

  transform(value: string, args: string): string {
    if (args === 'short') {
      return value.split('-')[0];
    } else if (args === 'long') {
      return value.split('-').join(' ');
    }
  }

}
