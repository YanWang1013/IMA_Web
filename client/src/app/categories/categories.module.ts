
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../api/services/category.service';
import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesComponent } from './categories.component';
@NgModule({
    declarations: [CategoriesComponent],
    imports: [CommonModule, CategoriesRoutingModule],
    providers: [CategoryService]
})
export class CategoriesModule {}
