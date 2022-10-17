
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ContactusRoutingModule } from './contactus-routing.module';
import { ContactusComponent } from './contactus.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations: [ContactusComponent],
    imports: [CommonModule, ContactusRoutingModule, FormsModule, ReactiveFormsModule, TranslateModule]

})
export class ContactusModule {}

