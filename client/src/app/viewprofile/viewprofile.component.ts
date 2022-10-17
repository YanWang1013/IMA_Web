
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from '../api/services/toast-service';
import { UserService } from '../api/services/user.service';
import { SessionService } from '../api/services/session-service';
import { UserBaseComponent } from '../user.base.component';
import { User } from '../api/models/user';
@Component({
    selector: 'app-viewprofile',
    templateUrl: './viewprofile.component.html',
    styleUrls: ['./viewprofile.component.scss']
})
export class ViewprofileComponent extends UserBaseComponent implements OnInit {
    constructor(
        protected router: Router,
        protected toastService: ToastService,
        protected userService: UserService,
        private sessionService: SessionService
    ) {
        super(router, userService, toastService);
    }

    ngOnInit(): void {
        this.userId = this.sessionService.user.id;
        this.getUser(null);
    }
}
