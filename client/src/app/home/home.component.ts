
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../api/services/session-service';
import { StartupService } from '../api/services/startup.service';
import { ToastService } from '../api/services/toast-service';
import { CategoryService } from '../api/services/category.service';
import { AppConst } from '../utils/app-const';
@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    public settings: any;
    public users: any;
    constructor(public sessionService: SessionService,
        public startupService: StartupService,
        private toastService: ToastService,
        private categoryService: CategoryService,
        private router: Router) {}

    ngOnInit() {
        this.settings = this.startupService.startupData();
        if (this.router.url.indexOf('message') > -1) {
            this.toastService.success(this.getParameterByName('message'));
        } else if (this.router.url.indexOf('success') > -1) {
            this.toastService.success('Payment completed Successfully');
        } else if (this.router.url.indexOf('pending') > -1) {
            this.toastService.error('Payment pending');
        } else if (this.router.url.indexOf('fail') > -1) {
            this.toastService.error('Payment completed failed');
        }
        if (this.settings && this.settings.CONTEST_EXIST && (this.settings.CONTEST_END_DAYS_LEFT || this.settings.CONTEST_END_TIME_LEFT)) {
            this.getUsers();
        }
    }

    handleEvent($event) {
        if ($event.action === 'stop') {
            this.router.navigate(['/recent_winner']);
        }
    }

    getParameterByName(name, url = window.location.href) {
        name = name.replace(/[\[\]]/g, '\\$&');
        let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }

    getUsers(): void {
        this.toastService.showLoading();
        this.categoryService.getContestantsHighestList().subscribe((response) => {
            this.users = (response.data && response.data.highest_votes && response.data.highest_votes.data) ? response.data.highest_votes.data : [];
            this.toastService.clearLoading();
        });
    }

    redirect(user: any): void {
        const url: string = '/profile/' + user.username;
        this.router.navigate([url]);
    }
}
