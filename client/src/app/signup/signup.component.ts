
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from '../api/services/toast-service';
import { UserService } from '../api/services/user.service';
import { SessionService } from '../api/services/session-service';
import { ServiceResponse } from '../api/models/service-response';
import { User } from '../api/models/user';
import { AppConst } from '../utils/app-const';
import { BaseComponent } from '../base.component';
import { SocialAuthService, FacebookLoginProvider, GoogleLoginProvider } from 'angularx-social-login';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    animations: [routerTransition()]
})
export class SignupComponent extends BaseComponent implements OnInit {
    public registerForm: FormGroup;
    public submitted: boolean;
    public user: User = new User();
    constructor(
        public router: Router,
        private formBuilder: FormBuilder,
        private userService: UserService,
        private sessionService: SessionService,
        private toastService: ToastService,
        private authService: SocialAuthService
    ) {
        super();
    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group(
            {
                first_name: ['', Validators.required],
                last_name: ['', Validators.required],
                email: ['', [Validators.required]],
                username: ['', [Validators.required, Validators.minLength(3)]],
                password: ['', [Validators.required, Validators.minLength(3)]],
                confirm_password: [
                    '',
                    [Validators.required, Validators.minLength(3)]
                ]
            },
            {validator: this.pwdMatchValidator}
        );
    }

    pwdMatchValidator(frm: FormGroup) {
        return frm.get('password').value === frm.get('confirm_password').value
            ? null
            : {invalid: true};
    }

    get password() {
        return this.registerForm.get('password');
    }
    get confirm_password() {
        return this.registerForm.get('confirm_password');
    }

    get f() {
        return this.registerForm.controls;
    }
    onSubmit() {
        this.submitted = true;
        if (this.registerForm.invalid) {
            return;
        }
        delete this.registerForm.value.confirm_password;
        this.toastService.showLoading();
        this.userService.register(this.registerForm).subscribe((response) => {
            this.submitted = false;
            this.user = response;
            if (
                this.user.error &&
                this.user.error.code === AppConst.SERVICE_STATUS.SUCCESS
            ) {
                this.toastService.success(this.user.error.message);
                if (this.user.access_token) {
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
                }
                this.router.navigate(['/'], { queryParams: { message: this.user.error.message } });
            } else {
                this.toastService.clearLoading();
                this.toastService.error(this.user.error.message);
            }
        });
    }

    onKeydown(event): void {
        if (event.key === 'Enter') {
            this.onSubmit();
        }
    }

    signInWithGoogle(): void {
        this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    }

    signInWithFB(): void {
        this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
    }
}
