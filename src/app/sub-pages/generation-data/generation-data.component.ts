import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ns-generation-data',
  templateUrl: './generation-data.component.html',
  styleUrls: ['./generation-data.component.scss']
})
export class GenerationDataComponent implements OnInit {

  generation: any;

  constructor(
    public router: RouterExtensions,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.generation = this.route.snapshot.data['resolve'];
  }

}
