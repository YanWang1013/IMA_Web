import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageRoutingModule } from './page-routing.module';
import { PageComponent } from './page.component';
import { UserService } from '../api/services/user.service';
@NgModule({
  declarations: [PageComponent],
  imports: [
    CommonModule,
    PageRoutingModule
  ],
  providers: [UserService]
})
export class PageModule { }
