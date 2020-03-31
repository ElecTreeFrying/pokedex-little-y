import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';


@Pipe({
  name: 'sortIndex'
})
export class SortIndexPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    return _.sortBy(value, [ 'slot' ]);
  }

}
