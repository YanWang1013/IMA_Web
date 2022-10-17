
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PasswordchangedRoutingModule } from './passwordchanged-routing.module';
import { PasswordchangedComponent } from './passwordchanged.component';
import { LanguageTranslationModule } from '../shared/modules/language-translation/language-translation.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../api/services/user.service';
@NgModule({
    declarations: [PasswordchangedComponent],
    imports: [
        CommonModule,
        PasswordchangedRoutingModule,
        LanguageTranslationModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [UserService]
})
export class PasswordchangedModule {}
