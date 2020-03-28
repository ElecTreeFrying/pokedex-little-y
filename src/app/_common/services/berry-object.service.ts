import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BerryObjectService {

  constructor() { }

  width(_flavors: any) {
    const has15 = _flavors.filter(e => e['potency'] === 15).length > 0;
    const has20 = _flavors.filter(e => e['potency'] === 20).length > 0;
    const has25 = _flavors.filter(e => e['potency'] === 25).length > 0;
    const has30 = _flavors.filter(e => e['potency'] === 30).length > 0;
    const has40 = _flavors.filter(e => e['potency'] === 40).length > 0;

    if (has15)      { return 12; } 
    else if (has20) { return 9; } 
    else if (has25) { return 7; } 
    else if (has30) { return 5; } 
    else if (has40) { return 3; }
    else            { return 20; }
  }

  flavors(_flavors: any) {
    return _flavors.map((flavor) => {
      const name = flavor['flavor']['name'];
      flavor['name'] = `${name[0].toUpperCase()}${name.slice(1)}`;
      flavor['potency'] = +flavor['potency'] === 0 ? 1 : +flavor['potency'];
      flavor['potency'] = new Array(flavor['potency']);
      delete flavor['flavor'];
      return flavor;
    });
  }

}
