import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyproductsComponent } from './myproducts.component';
import { MyproductsRoutingModule } from './myproducts.routing.module';

@NgModule({
  declarations: [MyproductsComponent],
  imports: [
    CommonModule,
    MyproductsRoutingModule
  ]
})
export class MyproductsModule { }
