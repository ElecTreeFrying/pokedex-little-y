import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { ActivatedRoute } from '@angular/router';
import { alert } from 'tns-core-modules/ui/dialogs';

@Component({
  selector: 'ns-pokedex-data',
  templateUrl: './pokedex-data.component.html',
  styleUrls: ['./pokedex-data.component.scss']
})
export class PokedexDataComponent implements OnInit {

  pokemon: any;

  constructor(
    public router: RouterExtensions,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.pokemon = this.route.snapshot.data['resolve'];
  }

  moreDetails(description: string) {
    alert({
      title: `About`,
      message: description.replace('dex', 'pokédex'),
      okButtonText: 'Exit',
      cancelable: true
    })
  }

}
