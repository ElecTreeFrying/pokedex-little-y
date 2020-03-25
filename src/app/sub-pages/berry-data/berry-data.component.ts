import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { ActivatedRoute } from '@angular/router';

import { PokeApiService } from "../../_common/services/poke-api.service";

@Component({
  selector: 'ns-berry-data',
  templateUrl: './berry-data.component.html',
  styleUrls: ['./berry-data.component.scss']
})
export class BerryDataComponent implements OnInit {

  berry: any;

  constructor(
    public router: RouterExtensions,
    private route: ActivatedRoute,
    private api: PokeApiService
  ) { }

  ngOnInit(): void {
    this.berry = this.route.snapshot.data['resolve'];
    this.berry['item']['data'] = this.api.berryEntries(this.berry['item']['url']);
  }

}
