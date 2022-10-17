
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdvertiserService } from '../api/services/advertisers.service';
import { AdvertisersRoutingModule } from './advertisers-routing.module';
import { SharedCommonModule } from '../shared-common/shared-common.module';
import { AdvertisersComponent } from './advertisers.component';

@NgModule({
    declarations: [AdvertisersComponent],
    imports: [CommonModule, AdvertisersRoutingModule, SharedCommonModule],
    providers: [AdvertiserService]
})
export class AdvertisersModule {}
