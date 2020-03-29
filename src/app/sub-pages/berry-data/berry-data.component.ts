import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { ActivatedRoute } from '@angular/router';
import { ScrollEventData } from 'tns-core-modules/ui/scroll-view';


import { PokeApiService } from "../../_common/services/poke-api.service";
import { BerryObjectService } from "../../_common/services/berry-object.service";

@Component({
  selector: 'ns-berry-data',
  templateUrl: './berry-data.component.html',
  styleUrls: ['./berry-data.component.scss']
})
export class BerryDataComponent implements OnInit {

  berry: any;
  isScrolled: boolean = true;
  width: number = 20;

  constructor(
    public router: RouterExtensions,
    private route: ActivatedRoute,
    private api: PokeApiService,
    private object: BerryObjectService
  ) { }

  ngOnInit(): void {
    this.berry = this.route.snapshot.data['resolve'];
    this.width = this.object.width(this.berry['flavors'])
    this.berry['item'] = this.api.berryEntries(this.berry['item_id']);
    this.berry['flavors'] = this.object.flavors(this.berry['flavors'])
  }
  
  onScroll(event: ScrollEventData) {
    this.isScrolled = event.scrollY === 0 ? false : true;
  }

}
