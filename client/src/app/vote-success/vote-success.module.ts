import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VoteSuccessRoutingModule } from './vote-success.routing.module';
import { VoteSuccessComponent } from './vote-success.component';

@NgModule({
  declarations: [VoteSuccessComponent],
  imports: [
    CommonModule,
    VoteSuccessRoutingModule
  ]
})
export class VoteSuccessModule { }
