import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../api/services/category.service';
import { ToastService } from '../api/services/toast-service';
import { User } from '../api/models/user';
import { QueryParam } from '../api/models/query-param';
import { AppConst } from '../utils/app-const';
import { BaseComponent } from '../base.component';
import { CountdownConfig, CountdownEvent } from 'ngx-countdown';
@Component({
  selector: 'app-winner',
  templateUrl: './winner.component.html',
  styleUrls: ['./winner.component.scss']
})
export class WinnerComponent extends BaseComponent implements OnInit {
  public usersTop: User[] = [];
  public users: User[] = [];
  public isNodata: boolean;
  public categoryId = 1;
  public categoryName = '';
  public pageType: number;
  public pageTitle: string;
  public left_time: number;
  public message: string;
  public isShowTime: any = false;
  public prettyConfig: CountdownConfig;
  public isHeader: any = false;
  constructor(
      private router: Router,
      private categoryService: CategoryService,
      private activatedRoute: ActivatedRoute,
      private toastService: ToastService,
  ) {
      super();
  }

  ngOnInit(): void {
    this.pageType = 2;
    this.getWinnerList();
  }

  dhms(t) {
      let days, hours, minutes, seconds = 0;
      days = Math.floor(t / 86400);
      t -= days * 86400;
      hours = Math.floor(t / 3600) % 24;
      t -= hours * 3600;
      minutes = Math.floor(t / 60) % 60;
      t -= minutes * 60;
      seconds = t % 60;
      return [
          days + ' days',
          hours + ' hours',
          minutes + ' minutes',
          seconds + ' seconds'
      ].join(', ');
  }

  getWinnerList(): void {
      this.toastService.showLoading();
      this.categoryService
          .getWinnerList(null)
          .subscribe((response) => {
            if (response.data) {
              if (response.data.highest_votes && response.data.highest_votes.data) {
                this.usersTop = response.data.highest_votes.data;
                this.pageTitle = response.data.highest_votes.title;
              }
              if (response.data.category_highest_votes) {
                this.users = response.data.category_highest_votes;
              }
              this.left_time = response.data.left_time;
              // this.counter$ = Observable.timer(0, this.left_time)
              //   .takeWhile(() => this.alive) // only fires when component is alive
              //   .subscribe(() => {
              //     return Math.floor((this.left_time - new Date().getTime()) / 1000);
              //   });
              // this.subscription = this.counter$.subscribe((x) => this.message = this.dhms(x));
              this.message = '4 days, 2 hours, 21 minutes, 41 seconds';
              this.isShowTime = true;
            }
            this.toastService.clearLoading();
          });
  }

  redirect(user: User): void {
      const url: string = '/profile/' + user.username;
      this.router.navigate([url]);
  }
}
