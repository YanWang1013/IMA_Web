
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { AppConst } from '../../utils/app-const';
@Injectable()
export class SessionService {
    public isAuth: boolean;
    public user: User;
    public authCheck: boolean;
    public auth: string;
    private _adminSettings: any;
    constructor(public router: Router,
        private apiService: ApiService) {}

    isLogined(): void {
        this.authCheck = (sessionStorage.getItem('user_context') && sessionStorage.getItem('user_context') !== '');
        if (this.authCheck) {
            this.auth = sessionStorage.getItem('user_context');
            this.isAuth = (this.auth !== undefined && this.auth !== null);
            if (this.isAuth) {
                this.setAuthResponse();
            }
        }
    }

    setAuthResponse(): void {
        this.user = JSON.parse(sessionStorage.getItem('user_context'));
    }

    logout(): void {
        sessionStorage.removeItem('user_context');
        sessionStorage.removeItem('login_time');
        sessionStorage.removeItem('access_token');
        sessionStorage.removeItem('refresh_token');
        sessionStorage.setItem(
            'user_context',
            ''
        );
        this.isAuth = false;
        this.user = null;
    }
}
