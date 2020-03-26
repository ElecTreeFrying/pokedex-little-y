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
    this.berry['item_data'] = this.api.berryEntries(this.berry['item_id']);

    this.berry['item_data'].subscribe((res) => {
    
      // delete this.berry['item_id'];
      // delete this.berry['item_data'];
      // this.berry['item'] = res;
      // console.log(res);
    });
    
    // console.log(this.berry);
  }

}
