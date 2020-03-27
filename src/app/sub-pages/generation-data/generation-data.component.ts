import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { ActivatedRoute } from '@angular/router';
import { AnimationCurve } from 'tns-core-modules/ui/enums';

@Component({
  selector: 'ns-generation-data',
  templateUrl: './generation-data.component.html',
  styleUrls: ['./generation-data.component.scss']
})
export class GenerationDataComponent implements OnInit {

  generation: any;

  constructor(
    public router: RouterExtensions,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.generation = this.route.snapshot.data['resolve'];
  }

  toPokemon(pokemon: any) {
    console.log('pokemon selected →', pokemon);
  }

  back() {
    this.router.navigate(['generation'], {
      animated: true,
      transition: {
        name: 'slideRight',
        curve: AnimationCurve.cubicBezier(1,0,.5,1),
        duration: 500
      }
    });
  }

}
