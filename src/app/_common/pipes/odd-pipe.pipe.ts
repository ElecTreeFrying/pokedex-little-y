import { Pipe, PipeTransform } from '@angular/core';

import { PokeApiService } from "../services/poke-api.service";

@Pipe({
  name: 'oddPipe'
})
export class OddPipePipe implements PipeTransform {

  constructor(
    private api: PokeApiService
  ) {}

  transform(value: any, ...args: unknown[]): unknown {
    const result = value - 1 - this.api.increase();
    return result;
  }

}
