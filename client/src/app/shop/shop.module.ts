
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductService } from '../api/services/product.service';
import { ShopRoutingModule } from './shop-routing.module';
import { ShopComponent } from './shop.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedCommonModule } from '../shared-common/shared-common.module';
import { NgxBootstrapSliderModule } from 'ngx-bootstrap-slider';
@NgModule({
    declarations: [
        ShopComponent
    ],
    imports: [
        CommonModule,
        ShopRoutingModule,
        SharedCommonModule,
        NgbModule,
        FormsModule,
        NgxBootstrapSliderModule
    ],
    providers: [
        ProductService
    ]
})
export class ShopModule {}
