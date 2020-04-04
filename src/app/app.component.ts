import { Component, OnInit, AfterViewInit, ViewChild, ChangeDetectorRef } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { 
  RadSideDrawer, SlideAlongTransition
} from 'nativescript-ui-sidedrawer';
import { RadSideDrawerComponent } from 'nativescript-ui-sidedrawer/angular';
import { RouterExtensions } from "nativescript-angular/router";
import { AnimationCurve } from 'tns-core-modules/ui/enums';

@Component({
  selector: "ns-app",
  templateUrl: "app.component.html",
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent implements OnInit, AfterViewInit { 

  item: any;
  // nav = [ 'Home', 'Pokédex', 'Pokémon', 'Generation', 'Berries', 'About' ];
  nav = [ 'Home', 'Pokédex', 'Pokémon', 'Generation', 'Berries' ];
  active: string = 'Home';
  isNavigating: boolean = false;

  @ViewChild(RadSideDrawerComponent, { static: false }) 
  public drawerComponent: RadSideDrawerComponent;
  private drawer: RadSideDrawer

  public transition = new SlideAlongTransition();

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private router: RouterExtensions,
    private route: ActivatedRoute
  ) {}

  ngAfterViewInit() {
    this.drawer = this.drawerComponent.sideDrawer;
    this.changeDetectorRef.detectChanges();
  }
  
  ngOnInit() {
  }

  onDrawerClosed() {
    if (!this.isNavigating) return;
    this.isNavigating = false;
    this.router.navigate([this.item], {
      animated: true,
      transition: {
        name: this.routeAnimation(),
        curve: AnimationCurve.cubicBezier(1,0,.5,1),
        duration: 500
      }
    });
  }

  navigate(item: string = "") {
    this.active = item;
    this.item = item.replace('é', 'e').toLowerCase();
    this.drawer.closeDrawer();
    this.isNavigating = true;
  }

  routeAnimation(): string {
    const prev = this.route.snapshot.firstChild.url[0].toString().replace('pokemon', 'pokémon').replace('pokedex', 'pokédex');
    const cleanPrev = prev[0].toUpperCase() + prev.slice(1);
    const indexOfPrev = this.nav.indexOf(cleanPrev);
    const indexOfNext = this.nav.indexOf(this.active);
    return indexOfPrev > indexOfNext ? 'slideBottom' : 'slideTop';
  }

}
