import { Component, OnInit, AfterViewInit, ViewChild, ChangeDetectorRef } from "@angular/core";
import { 
  RadSideDrawer, SlideAlongTransition
} from 'nativescript-ui-sidedrawer';
import { RadSideDrawerComponent } from 'nativescript-ui-sidedrawer/angular';
import { RouterExtensions } from "nativescript-angular/router";

@Component({
  selector: "ns-app",
  templateUrl: "app.component.html",
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent implements OnInit, AfterViewInit { 

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
    }), 3000;
  }

  navigate(item: string = "") {
    const route = item.replace('é', 'e').toLowerCase();

    this.router.navigate([ '/', route ]).then(() => {
      this.drawer.closeDrawer();
    });
  }

}
