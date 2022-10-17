import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecentWinnerComponent } from './recent-winner.component';
import { RecentWinnerRoutingModule } from './recent-winner-routing.module';
import { SharedCommonModule } from '../shared-common/shared-common.module';
import { CategoryService } from '../api/services/category.service';
import { UserService } from '../api/services/user.service';
@NgModule({
  declarations: [RecentWinnerComponent],
  imports: [
    CommonModule,
    SharedCommonModule,
    RecentWinnerRoutingModule
  ],
  providers: [CategoryService, UserService]
})
export class RecentWinnerModule { }
