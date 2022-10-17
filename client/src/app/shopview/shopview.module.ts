
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductService } from '../api/services/product.service';
import { ShopViewRoutingModule } from './shopview-routing.module';
import { ShopViewComponent } from './shopview.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedCommonModule } from '../shared-common/shared-common.module';
import { NgxBootstrapSliderModule } from 'ngx-bootstrap-slider';
@NgModule({
    declarations: [
        ShopViewComponent
    ],
    imports: [
        CommonModule,
        ShopViewRoutingModule,
        SharedCommonModule,
        NgbModule,
        FormsModule,
        NgxBootstrapSliderModule
    ],
    providers: [
        ProductService
    ]
})
export class ShopViewModule {}
