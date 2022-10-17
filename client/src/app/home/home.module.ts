
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../api/services/category.service';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SharedCommonModule } from '../shared-common/shared-common.module';
import { CountdownModule } from 'ngx-countdown';
@NgModule({
    declarations: [HomeComponent],
    imports: [CommonModule, HomeRoutingModule, SharedCommonModule, CountdownModule],
    providers: [CategoryService]
})
export class HomeModule {}
