import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstantSuccessRoutingModule } from './instant-success.routing.module';
import { InstantSuccessComponent } from './instant-success.component';

@NgModule({
  declarations: [InstantSuccessComponent],
  imports: [
    CommonModule,
    InstantSuccessRoutingModule
  ]
})
export class InstantSuccessModule { }
