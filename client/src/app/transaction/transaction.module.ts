import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedCommonModule } from '../shared-common/shared-common.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LanguageTranslationModule } from '../shared/modules/language-translation/language-translation.module';
import { TransactionComponent } from './transaction.component';
import { TransactionRoutingModule } from './transaction-routing.module';
import { TransactionService } from '../api/services/transaction.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    declarations: [TransactionComponent],
    imports: [
        CommonModule,
        TransactionRoutingModule,
        SharedCommonModule,
        FormsModule,
        ReactiveFormsModule,
        LanguageTranslationModule,
        NgbModule
    ],
    providers: [TransactionService]
})
export class TransactionModule {}
