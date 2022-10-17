import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../api/services/category.service';
import { ToastService } from '../api/services/toast-service';
import { User } from '../api/models/user';
import { QueryParam } from '../api/models/query-param';
import { AppConst } from '../utils/app-const';
import { BaseComponent } from '../base.component';
import { SessionService } from '../api/services/session-service';
import { UserService } from '../api/services/user.service';
@Component({
  selector: 'app-recent-winner',
  templateUrl: './recent-winner.component.html',
  styleUrls: ['./recent-winner.component.scss']
})
export class RecentWinnerComponent extends BaseComponent implements OnInit {
  public settings: any;
  public users: User[] = [];
  public isNodata: boolean;
  public categoryId = 1;
  public categoryName = '';
  public pageType: number;
  public pageTitle: string;
  constructor(
      private router: Router,
      private categoryService: CategoryService,
      private activatedRoute: ActivatedRoute,
      private toastService: ToastService,
      public sessionService: SessionService,
      public userService: UserService
  ) {
      super();
  }

  ngOnInit(): void {
    this.toastService.showLoading();
    this.userService
        .settings()
        .subscribe((response) => {
          this.settings = response.data;
          if (this.settings && this.settings.CONTEST_EXIST && this.settings.CONTEST_END_DAYS_LEFT < 0) {
            this.getRecentWinnerList();
          } else {
            this.toastService.clearLoading();
            this.router.navigate(['/']);
          }
        });    
  }

  getRecentWinnerList(): void {
    this.categoryService
        .getRecentWinnerList(null)
        .subscribe((response) => {
          if (response.data) {
            this.users = response.data;
          }
          this.toastService.clearLoading();
        });
  }

  redirect(user: User): void {
      const url: string = '/profile/' + user.username;
      this.router.navigate([url]);
  }
}
