import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { map } from 'rxjs/operators'
import { combineLatest } from 'rxjs';
import * as _ from 'lodash';

import { PokeApiService } from "../services/poke-api.service";

@Injectable({
  providedIn: 'root'
})
export class PokemonDataResolve implements Resolve<any> {
  
  sprite = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';

  constructor(
    private http: HttpClient,
    private api: PokeApiService,
  ) {}

  resolve(next: ActivatedRouteSnapshot,state: RouterStateSnapshot): any {

    const id = this.api.id;
    return this.http.get(`https://pokeapi.co/api/v2/pokemon/${id}`).pipe(
      map((pokemon: any) => {
        
        pokemon['abilities'] = pokemon['abilities'].map((ability) => {
          
          ability['ability']['data'] = this.http.get(ability['ability']['url']).pipe(
            map((ability) => {
              
              const effect_entry = ability['effect_entries'].filter(e => e.language.name === 'en')[0];
              delete effect_entry['language'];
              
              let flavor_text_entry = ability['flavor_text_entries'].filter(e => e.language.name === 'en')
                .filter(e => e.language.name === 'en')
                .map((entry: any) => {
                  entry['language'] = entry['language']['name'];
                  entry['text'] = entry['text'].replace(/\n/g, ' ');
                  entry['id'] = +entry['version_group']['url'].split('/').reverse()[1];
                  entry['version_group'] = entry['version_group']['name'];
                  entry['version'] = 'Pokémon ' + this.api.versionGroupPretty(entry['version_group']);

                  delete entry['language'];
                  return entry;
                });
              
                flavor_text_entry = _.sortBy(flavor_text_entry, [ 'id' ]);

              return { effect_entry, flavor_text_entry };
            })
          );

          delete ability['ability']['url'];
          delete ability['is_hidden'];

          return ability;
        });

        pokemon['game_indices'] = pokemon['game_indices'].map((index) => {
          index['id'] = index['version']['url'].split('/').reverse()[1];
          index['version_group'] = index['version']['name'];
          index['version'] = 'Pokémon ' + this.api.versionGroupPretty(index['version_group']);
          delete index['game_index']
          return index;
        });

        pokemon['height'] = `${+pokemon['height'] * 10} cm`;

        pokemon['moves'] = pokemon['moves'].map((move) => {
          
          // move
          move['move']['data'] = this.http.get(move['move']['url']).pipe(
            map((res) => {
              
              // accuracy
              const accuracy = res['accuracy'];
              
              // contest type
              const contest_type = res['contest_type']['name'];
              
              // contest effect
              const contest_effect = this.http.get(res['contest_effect']['url']).pipe(
                map((contest) => {
                  const effect_entry = contest['effect_entries'].filter(e => e.language.name === 'en')[0];
                  let flavor_text_entry = contest['flavor_text_entries'].filter(e => e.language.name === 'en')[0];
                  return { effect_entry, flavor_text_entry };
                })
              );

              // damage class
              const damage_class = this.http.get(res['damage_class']['url']).pipe(
                map((damage) => {
                  const description = damage['descriptions'].filter(e => e.language.name === 'en')[0];
                  const name = damage['name'];
                  return { description, name };
                })
              );

              // effect entry
              const effect_entry = res['effect_entries'].filter(e => e.language.name === 'en')[0];

              // flavor entry
              let flavor_text_entry = res['flavor_text_entries']
                .filter(e => e.language.name === 'en')
                .map((entry: any) => {
                  entry['language'] = entry['language']['name'];
                  entry['text'] = entry['text'].replace(/\n/g, ' ');
                  entry['id'] = +entry['version_group']['url'].split('/').reverse()[1];
                  entry['version_group'] = entry['version_group']['name'];
                  entry['version'] = 'Pokémon ' + this.api.versionGroupPretty(entry['version_group']);

                  delete entry['language'];
                  return entry;
                });
              
              flavor_text_entry = _.sortBy(flavor_text_entry, [ 'id' ]);
              

              // meta
              res['meta']['ailment'] = res['meta']['ailment']['name'];
              res['meta']['category']['description'] = this.http.get(res['meta']['category']['url']).pipe(
                map((category) => category['descriptions'].filter(e => e.language.name === 'en')[0].description)
              );
              
              delete res['meta']['max_hits'];
              delete res['meta']['max_turns'];
              delete res['meta']['min_hits'];
              delete res['meta']['min_turns'];
              delete res['meta']['category']['url']

              const meta = res['meta'];
              
              // name 
              const name = res['name'];
              
              // foreign names
              const foreign = res['names'].map((name) => {
                name['language'] = name['language']['name'];
                return name;
              });
              
              // power 
              const power = res['power'];

              // name 
              const pp = res['pp'];

              // super contest effect 
              const super_contest_effect = this.http.get(res['super_contest_effect']['url']).pipe(
                map((contest) => {
                  let flavor_text_entry = contest['flavor_text_entries'].filter(e => e.language.name === 'en')[0];
                  delete flavor_text_entry['language'];
                  return { flavor_text_entry };
                })
              );

              // target
              const target = this.http.get(res['target']['url']).pipe(
                map((target) => {
                  const name = target['name'];
                  const description = target['descriptions'].filter(e => e.language.name === 'en')[0].description;
                  return { name, description };
                })
              )

              // type
              const type = res['type']['name'];

              return { accuracy, contest_type, contest_effect, damage_class, effect_entry, flavor_text_entry, meta, name, foreign, power, pp, super_contest_effect, target, type };
            })
          );

          delete move['move']['url']

          // version group details          
          move['version_group_details'] = move['version_group_details'].map((version) => {
            
            version['move_learn_method']['data'] = this.http.get(version['move_learn_method']['url']).pipe(
              map((learnMethod) => {
                const description = learnMethod['descriptions'].filter(e => e.language.name === 'en')[0].description;
                const name = learnMethod['name'];
                return { name, description }
              })
            )

            delete version['version_group']
            delete version['move_learn_method']['url'];

            return version;
          })

          return move;
        });

        pokemon['species'] = this.http.get(pokemon['species']['url']).pipe(
          map((specie) => {
            
            specie['color'] = specie['color']['name'];

            specie['egg_groups'] = specie['egg_groups'].map((group) => {
              delete group['url'];
              return group;
            })

            specie['evolution_chain'] = this.http.get(specie['evolution_chain']['url']).pipe(
              map((chain) => {

                const first = {
                  name: chain['chain']['species']['name'],
                  evolution: chain['chain']['evolves_to']['species']['name'],
                  pokemon: chain['chain']['evolves_to']
                }
                
                const second = {
                  name: first['pokemon']['species']['name'],
                  evolution: first['pokemon']['evolves_to']['species']['name'],
                  pokemon: first['chain']['evolves_to']
                }
                
                const third = {
                  name: second['pokemon']['species']['name'],
                  evolution: second['pokemon']['evolves_to']['species']['name'],
                  pokemon: second['chain']['evolves_to']
                }
                
                return { first, second, third };
              })
            )
            
            pokemon['flavor_text_entries'] = pokemon['flavor_text_entries']
              .filter(e => e.language.name === 'en')
              .map((entry: any) => {
                entry['language'] = entry['language']['name'];
                entry['text'] = entry['text'].replace(/\n/g, ' ');
                entry['id'] = +entry['version_group']['url'].split('/').reverse()[1];
                entry['version_group'] = entry['version_group']['name'];
                entry['version'] = 'Pokémon ' + this.api.versionGroupPretty(entry['version_group']);
                
                delete entry['language'];
                return entry;
              });
            
            pokemon['flavor_text_entries'] = _.sortBy(pokemon['flavor_text_entries'], [ 'id' ])

            pokemon['genera'] = pokemon['genera'].filter(e => e.language.name === 'en')[0].genus;
            
            pokemon['growth_rate'] = this.http.get(pokemon['growth_rate']['url']).pipe(
              map((growth) => {
                
                growth['description'] = growth['descriptions'].filter(e => e.language.name === 'en')[0].description;

                delete growth['descriptions'];
                delete growth['formula'];
                delete growth['id'];
                delete growth['pokemon_species'];
                
                return growth;
              })
            )
            
            pokemon['habitat'] = pokemon['habitat']['name'];

            pokemon['pokedex_numbers'] = pokemon['pokedex_numbers'].map((pokedex) => {
              const name = pokedex['pokedex']['name'].split('-').join(' ');
              pokedex['pokedex'] = name.split(' ').map((a: string) => 
                a[0].toUpperCase() + a.slice(1)).join(' ');
              return pokedex;
            })

            pokemon['shape'] = pokemon['shape']['name'];

            delete specie['evolves_from_species'];
            delete specie['form_descriptions'];
            delete specie['forms_switchable'];
            delete specie['generation'];
            delete specie['has_gender_differences'];
            delete specie['id'];
            delete specie['is_baby'];
            delete specie['name'];
            delete specie['names'];
            delete specie['order'];
            delete specie['pal_park_encounters'];
            delete specie['varieties'];

            return specie;
          })
        );

        pokemon['stats'] = pokemon['stats'].map((stat) => {
          stat['stat'] = stat['stat']['name'];
          return stat;
        });
        
        pokemon['types'] = pokemon['types'].map((type) => {
          type['type'] = type['type']['name']
          return type;
        });
        
        delete pokemon['forms'];
        delete pokemon['held_items']
        delete pokemon['is_default']
        delete pokemon['location_area_encounters']
        delete pokemon['sprites']['back_female']
        delete pokemon['sprites']['back_shiny_female']
        delete pokemon['sprites']['front_female']
        delete pokemon['sprites']['front_shiny_female ']

        return pokemon;
      })
    );
  }
  
}
