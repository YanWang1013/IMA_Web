import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstantvoteRoutingModule } from './instantvote-routing.module';
import { InstantvoteComponent } from './instantvote.component';
import { CountdownModule } from 'ngx-countdown';
import { SharedCommonContestantModule } from '../shared-common/shared-common-contestant.module';
import { SharedCommonModule } from '../shared-common/shared-common.module';
import { CategoryService } from '../api/services/category.service';
@NgModule({
    declarations: [InstantvoteComponent],
    imports: [
        CountdownModule,
        CommonModule,
        InstantvoteRoutingModule,
        SharedCommonContestantModule,
        SharedCommonModule
    ],
    providers: [
        CategoryService
    ]
})
export class InstantvoteModule {}
