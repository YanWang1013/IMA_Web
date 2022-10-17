
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { TranslateModule } from '@ngx-translate/core';
import { SidebarComponent } from '../admin/components/sidebar/sidebar.component';
import { DefaultHeaderComponent } from '../admin/components/header/default.header.component';
import { SharedCommonCrudModule } from '../admin/common-shared/shared-common.crud.module';
import { SessionService } from '../api/services/session-service';
@NgModule({
    imports: [
        CommonModule,
        AdminRoutingModule,
        SharedCommonCrudModule,
        TranslateModule
    ],
    declarations: [
        AdminComponent,
        DefaultHeaderComponent,
        SidebarComponent
    ],
    providers: [
        SessionService
    ]
})
export class AdminModule {}
