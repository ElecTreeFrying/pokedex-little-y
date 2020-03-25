import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ns-type-data',
  templateUrl: './type-data.component.html',
  styleUrls: ['./type-data.component.scss']
})
export class TypeDataComponent implements OnInit {

  types: any;

  constructor(
    public router: RouterExtensions,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.types = this.route.snapshot.data['resolve'];
  }

}
