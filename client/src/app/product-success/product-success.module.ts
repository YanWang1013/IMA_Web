import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductSuccessRoutingModule } from './product-success.routing.module';
import { ProductSuccessComponent } from './product-success.component';

@NgModule({
  declarations: [ProductSuccessComponent],
  imports: [
    CommonModule,
    ProductSuccessRoutingModule
  ]
})
export class ProductSuccessModule { }
