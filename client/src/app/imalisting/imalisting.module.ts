
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImalistingRoutingModule } from './imalisting-routing.module';
import { ImalistingComponent } from './imalisting.component';

@NgModule({
    declarations: [ImalistingComponent],
    imports: [CommonModule, ImalistingRoutingModule]
})
export class ImalistingModule {}
