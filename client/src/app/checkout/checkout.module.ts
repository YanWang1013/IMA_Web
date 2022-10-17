
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CheckoutRoutingModule } from './checkout-routing.module';
import { CheckoutComponent } from './checkout.component';
import { PaymentService } from '../api/services/payment.service';
import { CategoryService } from '../api/services/category.service';
import { ProductService } from '../api/services/product.service';
@NgModule({
    declarations: [CheckoutComponent],
    imports: [CommonModule, CheckoutRoutingModule, FormsModule],
    providers: [PaymentService, CategoryService, ProductService]

})
export class CheckoutModule {}
