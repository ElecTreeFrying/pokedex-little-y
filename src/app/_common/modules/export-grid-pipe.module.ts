import { NgModule } from '@angular/core';

import { OddPipePipe } from "../pipes/odd-pipe.pipe";
import { EvenPipePipe } from "../pipes/even-pipe.pipe";

@NgModule({
  declarations: [
    OddPipePipe,
    EvenPipePipe
  ],
  exports: [
    OddPipePipe,
    EvenPipePipe
  ]
})
export class ExportGridPipeModule { }
