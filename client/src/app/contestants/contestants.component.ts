import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { ToastService } from '../api/services/toast-service';
import { CategoryService } from '../api/services/category.service';
import { CategoriesList } from '../api/models/categories-list';
import { UserList } from '../api/models/user-list';
import { User } from '../api/models/user';
import { QueryParam } from '../api/models/query-param';
import { BaseComponent } from '../base.component';
import { AppConst } from '../utils/app-const';


@Component({
    selector: 'app-contestants',
    templateUrl: './contestants.component.html',
    styleUrls: ['./contestants.component.scss']
})

export class ContestantsComponent extends BaseComponent implements OnInit {
    public categoriesList: CategoriesList;
    public userList: UserList;
    public users: User[] = [];
    public isNodata: boolean;
    public slug = '';
    public pageType: number;
    public categoryName: string;
    public header: any = true;
    public isContest: any;
    public isLoading: any = true;
    public metaData: any;
    public settings: any;
    public previousPage: any = 1;
    public catId: any = 0;
    public search = '';

    @Input('type')
    set type(value: number) {
        if (value) {
            this.pageType = value;
        }
    }
    @Input('usersData')
    set usersData(value: User[]) {
        if (value && value.length > 0) {
            this.users = value;
        }
    }
    @Input('isHeader')
    set isHeader(value: any) {
        if (value && value.length > 0) {
            this.header = value;
        }
    }
    constructor(
        protected router: Router,
        private categoryService: CategoryService,
        private activatedRoute: ActivatedRoute,
        private toastService: ToastService,
    ) {
        super();
    }

    ngOnInit(): void {
        if (this.router.url.indexOf(AppConst.SERVER_URL.CONTESTANTS) > -1) {
            this.slug = this.activatedRoute.snapshot.paramMap.get('slug');
            if (this.slug) {
                this.pageType = 1;
                this.slug = this.activatedRoute.snapshot.paramMap.get(
                    'slug'
                );
                if (this.slug === 'all') {
                    this.isContest = true;
                    this.getContestantsByCategories();
                } else {
                    this.isContest = false;
                    this.categoryService.getAll(null).subscribe((response) => {
                        this.categoriesList = response;
                        this.categoriesList.data.forEach(category => {
                            if (category.slug === this.slug) {
                                this.categoryName = category.name;
                                this.isContest = false;
                                this.catId = category.id;
                                this.getContestantsByCategories();
                                return;
                            }
                        });
                    });
                }
            }
        }
    }

    getContestantsByCategories(): void {
        this.toastService.showLoading();
        this.isNodata = true;
        const queryParam: QueryParam = {
            page: this.previousPage,
            sort: 'username',
            sortby: 'ASC',
            category_id: (this.catId !== 0) ? this.catId : '',
            search: this.search
        };
        this.categoryService
            .getContestantsList(queryParam)
            .subscribe((response) => {
                this.userList = response;
                this.metaData = response._metadata;
                if (
                    this.userList.error &&
                    this.userList.error.code !== AppConst.SERVICE_STATUS.SUCCESS
                ) {
                    this.toastService.error(this.userList.error.message);
                } else {
                    this.users = this.userList.data;
                    this.isNodata = this.userList.data.length === 0;
                }
                this.isLoading = false;
                this.toastService.clearLoading();
            });
    }

    loadPage(page: number) {
        if (page !== this.previousPage) {
          this.previousPage = page;
          this.getContestantsByCategories();
        }
    }
    trackById(index: number, el: any): number {
        return el.id;
    }

    redirect(user: User): void {
        let url: string;
        if (this.slug === 'all') {
            url = '/profile/' + user.username;
        } else {
            url = '/profile/' + user.category.category.slug + '/' + user.username;
        }
        this.router.navigate([url]);
    }
    goBack(): void {
        this.router.navigate(['/']);
    }
}
