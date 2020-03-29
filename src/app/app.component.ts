import { Component, OnInit, AfterViewInit, ViewChild, ChangeDetectorRef } from "@angular/core";
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
  nav = [ 'Home', 'Pokédex', 'Pokémon', 'Generation', 'Berries' ];

  @ViewChild(RadSideDrawerComponent, { static: false }) 
  public drawerComponent: RadSideDrawerComponent;
  private drawer: RadSideDrawer

  public transition = new SlideAlongTransition();

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private router: RouterExtensions
  ) {}

  ngAfterViewInit() {
    this.drawer = this.drawerComponent.sideDrawer;
    this.changeDetectorRef.detectChanges();
  }
  
  ngOnInit() {
    // this.test();
  }

  test() {
    setTimeout(() => { 
      this.router.navigate(['/', 'berries']);
    }), 1000;
  }

  onDrawerClosed() {
    this.router.navigate([this.item], {
      animated: true,
      transition: {
        name: 'slide',
        curve: AnimationCurve.cubicBezier(1,0,.5,1),
        duration: 500
      }
    });
  }

  navigate(item: string = "") {
    this.item = item.replace('é', 'e').toLowerCase();
    this.drawer.closeDrawer();
  }

}
