import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JudgesComponent } from './judges.component';
import { JudgesRoutingModule } from './judges-routing.module';
@NgModule({
  declarations: [
    JudgesComponent
  ],
  imports: [
    CommonModule,
    JudgesRoutingModule
  ]
})
export class JudgesModule { }
