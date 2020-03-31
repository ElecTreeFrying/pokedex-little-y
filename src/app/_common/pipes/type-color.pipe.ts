import { Pipe, PipeTransform } from '@angular/core';

import { color } from "../services/poke-api.service";


@Pipe({
  name: 'typeColor'
})
export class TypeColorPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    return '#' + color['light'][`${value}`];
  }

}
