
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../api/services/category.service';
import { ContestantsRoutingModule } from './contestants-routing.module';
import { SharedCommonContestantModule } from '../shared-common/shared-common-contestant.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { ContestantsComponent } from './contestants.component';

@NgModule({
    imports: [CommonModule, ContestantsRoutingModule, SharedCommonContestantModule, NgbModule, ReactiveFormsModule],
    providers: [CategoryService],
    declarations: [],
})
export class ContestantsModule {}
