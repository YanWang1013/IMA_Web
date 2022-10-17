import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoryService } from '../api/services/category.service';
import { ToastService } from '../api/services/toast-service';
import { User } from '../api/models/user';
import { Contest } from '../api/models/contest';
import { UserContestList } from '../api/models/user-contest-list';
import { UserContest } from '../api/models/user-contest';
import { QueryParam } from '../api/models/query-param';
import { AppConst } from '../utils/app-const';
import { BaseComponent } from '../base.component';
import { SessionService } from '../api/services/session-service';
import { CountdownConfig, CountdownEvent } from 'ngx-countdown';
@Component({
    selector: 'app-instantvote',
    templateUrl: './instantvote.component.html',
    styleUrls: ['./instantvote.component.scss']
})
export class InstantvoteComponent extends BaseComponent implements OnInit {
    public users: User[] = [];
    public contests: Contest[] = [];
    public userContestList: UserContestList;
    public userContests: UserContest[] = [];
    public contest: Contest;
    public isNodata: boolean;
    public categoryId = 1;
    public categoryName = '';
    public pageType: number;
    public interVal: number;
    public left_time: number;
    public days: number;
    public hours: number;
    public minutes: number;
    public seconds: number;
    public pageTitle: string;
    public end_date: string;
    public isShowTime = false;
    public userId: string;
    public prettyConfig: CountdownConfig;
    public contestProgress = false;
    constructor(
        private router: Router,
        private categoryService: CategoryService,
        private activatedRoute: ActivatedRoute,
        private toastService: ToastService,
        public sessionService: SessionService
    ) {
        super();
    }

    ngOnInit(): void {
      if (this.router.url.indexOf('success') > -1) {
          this.contestProgress = true;
          this.toastService.success('Payment completed Successfully');
        }
        if (this.router.url.indexOf('pending') > -1) {
            this.toastService.warning('Payment pending');
        }
        if (this.router.url.indexOf('fail') > -1) {
            this.toastService.error('Payment completed failed');
        }
        if (!this.contestProgress) {
          this.getContestantsList();
          this.getContest();
        } else {
          this.getContest();
        }
    }

    getContestantsList(): void {
      this.toastService.showLoading();
      const queryParam: QueryParam = {
            contest_id: 1
        };
      this.categoryService
          .getContestantsList(queryParam)
          .subscribe((response) => {
            if (response.data) {
              this.users = response.data;
            }
            this.toastService.clearLoading();
          });
    }

    getContestantsWinnerList(): void {
      this.toastService.showLoading();
      this.categoryService
          .getContestantsWinnerList(null)
          .subscribe((response) => {
            this.userContestList = response;
            this.userContests = response.data;
            this.userContests.forEach(contestUser => {
              contestUser.percentage = ((contestUser.instant_votes / this.userContestList.max_limit) * 100).toFixed(2) + '%';
            });
            this.toastService.clearLoading();
          });
    }

    getContest(): void {
       this.categoryService
            .getContest(null)
            .subscribe((response) => {
              if (response.data) {
                this.contests = response.data;
                if (this.contests.length > 0) {
                  this.contest = this.contests[0];
                  if (!this.contestProgress) {
                    this.getContestantsList();
                    this.left_time = response.left_time;
                    this.prettyConfig = {
                      leftTime: response.left_time,
                      format: 'HH:mm:ss',
                      prettyText: (text) => {
                        return text
                          .split(':')
                          .map((v, index) => {
                            if (index === 0) {
                              return '<div class="hours timings text-center"><span class="count">' + v + '</span><span class="timetext text-uppercase">Hours</span></div>';
                            } else if (index === 1) {
                              return '<div class="minutes timings text-center"><span class="count">' + v + '</span><span class="timetext text-uppercase">Minutes</span></div>';
                            } else {
                              return '<div class="seconds timings text-center"><span class="count">' + v + '</span><span class="timetext text-uppercase">Seconds</span></div>';
                            }
                          })
                          .join('<div class="timecolan">:</div>');
                      },
                    };
                    this.isShowTime = true;
                  } else {
                    this.getContestantsWinnerList();
                  }
                }
              }
            });
    }

    stopTimer() {
      this.isShowTime = false;
    }

    handleEvent(event) {
      this.isShowTime = false;
    }

    chooseUser(user: User): void {
      this.users.forEach(userMain => {
        userMain.is_active = false;
      });
      user.is_active = true;
      this.userId = user.username;
      const url: string = '/instant_vote/' + this.userId;
      this.router.navigate([url]);
    }
  }
