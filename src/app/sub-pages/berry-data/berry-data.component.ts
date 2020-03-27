import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { ActivatedRoute } from '@angular/router';
import { ScrollEventData } from 'tns-core-modules/ui/scroll-view';
import { AnimationCurve } from 'tns-core-modules/ui/enums';

import { PokeApiService } from "../../_common/services/poke-api.service";

@Component({
  selector: 'ns-berry-data',
  templateUrl: './berry-data.component.html',
  styleUrls: ['./berry-data.component.scss']
})
export class BerryDataComponent implements OnInit {

  berry: any;
  isScrolled: boolean = true;

  constructor(
    public router: RouterExtensions,
    private route: ActivatedRoute,
    private api: PokeApiService
  ) { }

  ngOnInit(): void {
    this.berry = this.route.snapshot.data['resolve'];
    this.berry['item'] = this.api.berryEntries(this.berry['item_id']);
  }

  onScroll(event: ScrollEventData) {
    this.isScrolled = event.scrollY === 0 ? false : true;
  }  
  
  back() {
    this.router.navigate(['berries'], {
      animated: true,
      transition: {
        name: 'slide',
        curve: AnimationCurve.cubicBezier(1,0,.5,1),
        duration: 500
      }
    });
  }

}
