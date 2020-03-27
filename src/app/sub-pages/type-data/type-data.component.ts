import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { ActivatedRoute } from '@angular/router';
import { AnimationCurve } from 'tns-core-modules/ui/enums';

@Component({
  selector: 'ns-type-data',
  templateUrl: './type-data.component.html',
  styleUrls: ['./type-data.component.scss']
})
export class TypeDataComponent implements OnInit {

  types: any;

  constructor(
    public router: RouterExtensions,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.types = this.route.snapshot.data['resolve'];
  }

  toPokemon(pokemon: any) {
    console.log('pokemon selected →', pokemon);
  }

  back() {
    this.router.navigate(['pokemon'], {
      animated: true,
      transition: {
        name: 'slideRight',
        curve: AnimationCurve.cubicBezier(1,0,.5,1),
        duration: 500
      }
    });
  }

}
