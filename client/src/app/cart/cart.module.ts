
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedCommonModule } from '../shared-common/shared-common.module';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../api/services/product.service';
@NgModule({
    declarations: [CartComponent],
    imports: [CommonModule, CartRoutingModule, SharedCommonModule, NgbModule, FormsModule],
    providers: [ProductService]
})
export class CartModule {}
