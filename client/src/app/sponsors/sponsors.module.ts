import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdvertiserService } from '../api/services/advertisers.service';
import { SponsorsComponent } from './sponsors.component';
import { SponsorsRoutingModule } from './sponsors-routing.module';
import { SharedCommonModule } from '../shared-common/shared-common.module';
@NgModule({
  declarations: [
    SponsorsComponent
  ],
  imports: [
    CommonModule,
    SponsorsRoutingModule,
    SharedCommonModule
  ],
  providers: [AdvertiserService]
})
export class SponsorsModule { }
