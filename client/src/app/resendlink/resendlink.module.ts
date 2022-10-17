
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResendlinkRoutingModule } from './resendlink-routing.module';
import { ResendlinkComponent } from './resendlink.component';
@NgModule({
    declarations: [ResendlinkComponent],
    imports: [CommonModule, ResendlinkRoutingModule]
})
export class ResendlinkModule {}
