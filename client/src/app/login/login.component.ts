
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { routerTransition } from '../router.animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from '../api/services/toast-service';
import { UserService } from '../api/services/user.service';
import { SessionService } from '../api/services/session-service';
import { ServiceResponse } from '../api/models/service-response';
import { SocialLogin } from '../api/models/social-login';
import { QueryParam } from '../api/models/query-param';
import { User } from '../api/models/user';
import { AppConst } from '../utils/app-const';
import { BaseComponent } from '../base.component';
import { SocialAuthService } from 'angularx-social-login';
import { FacebookLoginProvider, GoogleLoginProvider } from 'angularx-social-login';
import { SocialUser } from 'angularx-social-login';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent extends BaseComponent implements OnInit {
    public loginForm: FormGroup;
    public serviceResponse: ServiceResponse = new ServiceResponse();
    public submitted: Boolean;
    public user: User = new User();
    public socialUser: SocialUser;
    public socialLogin: SocialLogin;
    constructor(
        public router: Router,
        private activatedRoute: ActivatedRoute,
        private formBuilder: FormBuilder,
        private userService: UserService,
        private sessionService: SessionService,
        private toastService: ToastService,
        private authService: SocialAuthService
    ) {
        super();
    }

    ngOnInit() {
        const isSessionExpired = sessionStorage.getItem('session_expired');
        const isBackendFailure = sessionStorage.getItem('backend_failure');
        if (isSessionExpired !== undefined && isSessionExpired === 'true') {
            sessionStorage.removeItem('session_expired');
            // this.toastService.warning('Session Expired');
        } else if (
            isBackendFailure !== undefined &&
            isBackendFailure === 'true'
        ) {
            sessionStorage.removeItem('backend_failure');
            this.toastService.error(
                'We are facing a backend problem, please try again after sometimes or if the issue exist kindly contact adminstrator'
            );
        }
        this.loginForm = this.formBuilder.group({
            username: ['', [Validators.required, Validators.minLength(3)]],
            password: ['', [Validators.required, Validators.minLength(3)]]
        });
        // https://dzone.com/articles/login-with-facebook-and-google-using-angular-8
        this.authService.authState.subscribe((user) => {
            this.socialUser = user;
            if (this.socialUser !== null) {
                if (this.socialUser.provider === 'GOOGLE') {
                    this.googleSuccessHandler();
                } else {
                    this.facebookSuccessHandler();
                }
            } else {
                this.toastService.error('Please try again after some time');
            }
        });
    }

    googleSuccessHandler() {
        this.toastService.showLoading();
        this.socialLogin = {
            idToken: this.socialUser.idToken
        };
        let queryParam: QueryParam;
        queryParam = {
            type: 'google'
        };
        this.userService.socialLogin(this.socialLogin, queryParam)
            .subscribe((data) => {
                this.user = data;
                this.setLoginData();
            });
    }

    facebookSuccessHandler() {
        this.toastService.showLoading();
        this.socialLogin = {
            access_token: this.socialUser.authToken
        };
        let queryParam: QueryParam;
        queryParam = {
            type: 'facebook'
        };
        this.userService.socialLogin(this.socialLogin, queryParam)
            .subscribe((data) => {
                this.user = data;
                this.setLoginData();
            });
    }

    get f() {
        return this.loginForm.controls;
    }

    onSubmit(): void {
        this.submitted = true;
        if (this.loginForm.invalid) {
            return;
        }
        this.toastService.showLoading();
        this.userService.login(this.loginForm).subscribe((data) => {
            this.submitted = false;
            this.user = data;
            this.setLoginData();
        });
    }

    setLoginData() {
        if (
            this.user.error &&
            this.user.error.code === AppConst.SERVICE_STATUS.SUCCESS
        ) {
            this.toastService.success(this.user.error.message);
            sessionStorage.setItem(
                'user_context',
                JSON.stringify(this.user)
            );
            sessionStorage.setItem('access_token', this.user.access_token);
            sessionStorage.setItem('refresh_token', this.user.refresh_token);
            const dt = new Date();
            dt.setMinutes( dt.getMinutes() + 60 );
            sessionStorage.setItem(
                'login_time', dt.toString()
            );
            this.sessionService.isLogined();
            if ( this.user.pwd_reset_flag === 1) {
                this.router.navigate(['/change-password']);
            } else if (this.activatedRoute.snapshot.queryParams && this.activatedRoute.snapshot.queryParams.f) {
                const url = this.activatedRoute.snapshot.queryParams.f + '?' + this.activatedRoute.snapshot.fragment;
                this.router.navigate([url]);
            } else if (this.user.role.id === AppConst.ROLE.ADMIN || this.user.role.id === AppConst.ROLE.COMPANY) {
                this.router.navigate(['/admin']);
            } else if (this.user.role.id === AppConst.ROLE.CONTESTANT) {
                this.router.navigate(['/profile/' + this.user.username]);
            } else {
                this.router.navigate(['/']);
            }
        } else {
            this.toastService.error(this.user.error.message);
        }
        this.toastService.clearLoading();
    }

    signInWithGoogle(): void {
        this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    }

    signInWithFB(): void {
        this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
    }

    signOut(): void {
        this.authService.signOut();
    }

    onKeydown(event): void {
        if (event.key === 'Enter') {
            this.onSubmit();
        }
    }
}
