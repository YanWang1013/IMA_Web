
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditprofileRoutingModule } from './editprofile-routing.module';
import { EditprofileComponent } from './editprofile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LanguageTranslationModule } from '../shared/modules/language-translation/language-translation.module';
import { UserService } from '../api/services/user.service';
import { SharedCommonModule } from '../shared-common/shared-common.module';
import { ImageService } from '../api/services/image.service';

@NgModule({
    declarations: [EditprofileComponent],
    imports: [
        CommonModule,
        EditprofileRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        LanguageTranslationModule,
        SharedCommonModule
    ],
    providers: [UserService, ImageService]
})
export class EditprofileModule {}
