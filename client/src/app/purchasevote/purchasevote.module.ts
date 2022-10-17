
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PurchasevoteRoutingModule } from './purchasevote-routing.module';
import { PurchasevoteComponent } from './purchasevote.component';
import { UserService } from '../api/services/user.service';
import { PaymentService } from '../api/services/payment.service';
import { SharedCommonModule } from '../shared-common/shared-common.module';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [PurchasevoteComponent],
    imports: [CommonModule, PurchasevoteRoutingModule, SharedCommonModule, FormsModule],
    providers: [UserService, PaymentService]
})
export class PurchasevoteModule {}
