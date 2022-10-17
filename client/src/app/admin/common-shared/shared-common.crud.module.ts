
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { ListComponent } from '../crud/components/list/list.component';
import { AddComponent } from '../crud/components/add/add.component';
import { EditComponent } from '../crud/components/edit/edit.component';
import { ViewComponent } from '../crud/components/view/view.component';
import { CrudService } from '../../api/services/crud.service';
import { TargetEntityToNamePipe } from './target-entity-to-name.pipe';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedCommonModule } from '../../shared-common/shared-common.module';
import { NgxTagsInputModule } from 'ngx-tags-input';
import { SelectDropDownModule } from 'ngx-select-dropdown';

@NgModule({
    declarations: [
        ListComponent,
        AddComponent,
        EditComponent,
        ViewComponent,
        TargetEntityToNamePipe
    ],
    imports: [
        CommonModule,
        NgbDropdownModule,
        AngularEditorModule,
        NgbModule,
        FormsModule,
        SharedCommonModule,
        NgxTagsInputModule,
        SelectDropDownModule
    ],
    exports: [
        ListComponent,
        AddComponent,
        EditComponent,
        ViewComponent,
        TargetEntityToNamePipe,
        AngularEditorModule,
        NgbModule
    ],
    providers: [
        CrudService
    ]
})
export class SharedCommonCrudModule {}
