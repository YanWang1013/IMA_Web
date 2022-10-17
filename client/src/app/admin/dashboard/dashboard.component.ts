
import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { AdminService } from '../../api/services/admin.service';
import { ActivatedRoute, Router} from '@angular/router';
import { UserService } from '../../api/services/user.service';
import { ToastService } from '../../api/services/toast-service';
import { SessionService } from '../../api/services/session-service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [routerTransition()]
})
export class DashboardComponent implements OnInit {
    public alerts: Array<any> = [];
    public user_count: String = '';
    public company_count: String = '';
    public contestant_count: String = '';
    public approval_count: String = '';

    constructor(
        protected router: Router,
        protected userService: UserService,
        protected toastService: ToastService,
        private activatedRoute: ActivatedRoute,
        public sessionService: SessionService,
        public adminService: AdminService
    ) {    }

    ngOnInit() {
        this.adminService.dashboard(null).subscribe((response) => {
            const data = response.data;
            this.user_count = data.user_count;
            this.company_count = data.company_count;
            this.contestant_count = data.contestant_count;
            this.approval_count = data.approval_count;
        });
    }
}
