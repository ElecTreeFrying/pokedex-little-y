import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { RouterExtensions } from 'nativescript-angular/router';
import * as app from "tns-core-modules/application";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { AnimationCurve } from 'tns-core-modules/ui/enums';

import { PokeApiService } from "../../_common/services/poke-api.service";
import { ScrollEventData, ScrollView } from "tns-core-modules/ui/scroll-view/scroll-view";

@Component({
  selector: 'ns-berries',
  templateUrl: './berries.component.html',
  styleUrls: ['./berries.component.scss']
})
export class BerriesComponent implements OnInit {

  all: any;
  berries: any;

  constructor(
    private router: RouterExtensions,
    private route: ActivatedRoute,
    private api: PokeApiService
  ) { }
  
  ngOnInit(): void {
    this.all = this.route.snapshot.data['resolve'];
    this.berries = this.all.slice(0, 18);
  }

  navigate(item: any) {
    this.api.id.berryId = item['id'];
    console.log(['/', 'berry-data']);
    this.router.navigate(['/', 'berry-data'], {
      animated: true,
      transition: {
        name: 'slide',
        curve: AnimationCurve.cubicBezier(1,0,.5,1),
        duration: 500
      }
    });
  }

  onShow() {
    const drawer = <RadSideDrawer>app.getRootView();
    drawer.showDrawer();
  }

  onScroll() {
    if (this.berries.length === 18) {
      const newEntries = this.all.slice(18);
      this.berries = this.berries.concat(newEntries);
    }
  }
  
}
