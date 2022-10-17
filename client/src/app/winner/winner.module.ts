import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { SharedCommonContestantModule } from '../shared-common/shared-common-contestant.module';
import { WinnerRoutingModule } from './winner-routing.module';
import { CategoryService } from '../api/services/category.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    WinnerRoutingModule,
    SharedCommonContestantModule
  ],
  providers: [CategoryService]
})
export class WinnerModule { }
