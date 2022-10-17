import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddproductComponent } from './addproduct.component';
import { AddproductRoutingModule } from './addproduct-routing.module';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../api/services/category.service';
import { ColorPickerModule } from 'ngx-color-picker';
import { UserService } from '../api/services/user.service';
import { ProductService } from '../api/services/product.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  declarations: [AddproductComponent],
  imports: [
    CommonModule,
    AddproductRoutingModule,
    FormsModule,
    ColorPickerModule,
    NgbModule
  ],
  providers: [CategoryService, UserService, ProductService]
})
export class AddproductModule { }
