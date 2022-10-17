
import { Component, OnInit } from '@angular/core';
import { ToastService } from '../api/services/toast-service';
import { CategoryService } from '../api/services/category.service';
import { CategoriesList } from '../api/models/categories-list';
import { AppConst } from '../utils/app-const';
import { BaseComponent } from '../base.component';
import { QueryParam } from '../api/models/query-param';

@Component({
    selector: 'app-categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent extends BaseComponent implements OnInit {
    public categoriesList: CategoriesList;
    public isNodata: boolean;
    constructor(
        private categoryService: CategoryService,
        private toastService: ToastService
    ) {
        super();
    }

    ngOnInit(): void {
        this.getCategories();
    }

    getCategories(): void {
        this.toastService.showLoading();
        this.isNodata = true;
        const queryParam: QueryParam = {
            type: 'all',
            sort: 'name',
            sortby: 'asc'
        };
        this.categoryService.getAll(queryParam).subscribe((data) => {
            this.categoriesList = data;
            if (
                this.categoriesList.error &&
                this.categoriesList.error.code !==
                    AppConst.SERVICE_STATUS.SUCCESS
            ) {
                this.toastService.error(this.categoriesList.error.message);
            } else {
                if (this.categoriesList.data.length !== 0) {
                    this.isNodata = false;
                }
            }
            this.toastService.clearLoading();
        });
    }

    trackById(index: number, el: any): number {
        return el.id;
    }
}
