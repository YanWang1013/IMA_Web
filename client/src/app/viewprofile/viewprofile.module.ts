
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewprofileRoutingModule } from './viewprofile-routing.module';
import { SharedCommonModule } from '../shared-common/shared-common.module';
import { ViewprofileComponent } from './viewprofile.component';
import { UserService } from '../api/services/user.service';
@NgModule({
    declarations: [ViewprofileComponent],
    imports: [CommonModule, ViewprofileRoutingModule, SharedCommonModule],
    providers: [UserService]
})
export class ViewprofileModule {}
