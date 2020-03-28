import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { ActivatedRoute } from '@angular/router';
import { EventData } from 'tns-core-modules/data/observable';
import { ActionBar } from 'tns-core-modules/ui/action-bar';
import { AnimationCurve } from 'tns-core-modules/ui/enums';
import { alert } from 'tns-core-modules/ui/dialogs';

@Component({
  selector: 'ns-pokedex-data',
  templateUrl: './pokedex-data.component.html',
  styleUrls: ['./pokedex-data.component.scss']
})
export class PokedexDataComponent implements OnInit {

  pokemon: any;
  isShowActionItem: boolean;

  constructor(
    public router: RouterExtensions,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.pokemon = this.route.snapshot.data['resolve'];
    this.isShowActionItem = this.pokemon.description.length > 0;
  }

  toPokemon(pokemon: any) {
    console.log('pokemon selected →', pokemon);
  }

  onActionBarLoaded(event: EventData) {
    const object = <ActionBar>event.object;

    const overflowIcon = object.nativeView.getOverflowIcon();
    overflowIcon.setColorFilter(
      android.graphics.Color.parseColor('#FFFFFF'),
      android.graphics.PorterDuff.Mode.SRC_ATOP,
    );
  }

  back() {
    this.router.navigate(['pokedex'], {
      animated: true,
      transition: {
        name: 'slideRight',
        curve: AnimationCurve.cubicBezier(1,0,.5,1),
        duration: 500
      }
    });
  }

  moreDetails(description: string) {
    alert({
      title: `Pokédex`,
      message: description.replace('dex', 'pokédex').replace('—', ' — ') + '.',
      okButtonText: 'Done',
      cancelable: true
    })
  }

}


