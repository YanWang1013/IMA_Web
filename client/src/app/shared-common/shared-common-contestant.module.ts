
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedCommonModule } from './shared-common.module';
import { ContestantsComponent } from '../contestants/contestants.component';
import { WinnerComponent } from '../winner/winner.component';
import { CountdownModule } from 'ngx-countdown';
import { FormsModule } from '@angular/forms';
@NgModule({
    declarations: [
        ContestantsComponent,
        WinnerComponent
    ],
    imports: [
        CommonModule,
        SharedCommonModule,
        NgbModule,
        CountdownModule,
        FormsModule
    ],
    exports: [
        ContestantsComponent,
        WinnerComponent
    ]
})
export class SharedCommonContestantModule {}
