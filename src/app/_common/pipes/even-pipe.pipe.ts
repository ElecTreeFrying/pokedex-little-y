import { Pipe, PipeTransform } from '@angular/core';

import { PokeApiService } from "../services/poke-api.service";

@Pipe({
  name: 'evenPipe'
})
export class EvenPipePipe implements PipeTransform {

  constructor(
    private api: PokeApiService
  ) {}

  transform(value: any, ...args: unknown[]): unknown {
    const result = value - this.api.getCounter();
    return result;
  }

}
