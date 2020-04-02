import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { AboutRoutingModule } from './about-routing.module';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { AboutComponent } from './about.component';


@NgModule({
  declarations: [AboutComponent],
  imports: [
    AboutRoutingModule,
    NativeScriptCommonModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AboutModule { }
