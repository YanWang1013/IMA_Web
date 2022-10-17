
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from '../api/services/toast-service';
import { UserService } from '../api/services/user.service';
import { SessionService } from '../api/services/session-service';
import { AppConst } from 'src/app/utils/app-const';
import {Location} from '@angular/common';

@Component({
    selector: 'app-passwordchanged',
    templateUrl: './passwordchanged.component.html',
    styleUrls: ['./passwordchanged.component.scss']
})
export class PasswordchangedComponent implements OnInit {
    public isSubmitted: boolean;
    public changepasswordForm: FormGroup;
    public changedSuccess: boolean;
    constructor(
        public router: Router,
        private formBuilder: FormBuilder,
        private toastService: ToastService,
        private userService: UserService,
        public sessionService: SessionService,
        private _location: Location,
    ) {}

    ngOnInit(): void {
        this.changepasswordForm = this.formBuilder.group(
            {
                password: ['', this.sessionService.user.pwd_reset_flag === 1 ? [] : [Validators.required]],
                new_password: [
                    '',
                    [Validators.required, Validators.minLength(3)]
                ],
                confirm_password: [
                    '',
                    [Validators.required, Validators.minLength(3)]
                ]
            },
            {validator: this.pwdMatchValidator}
        );
    }

    pwdMatchValidator(frm: FormGroup) {
        return frm.get('new_password').value ===
            frm.get('confirm_password').value
            ? null
            : {invalid: true};
    }
    get password() {
        return this.changepasswordForm.get('new_password');
    }
    get confirm_password() {
        return this.changepasswordForm.get('confirm_password');
    }

    get f() {
        return this.changepasswordForm.controls;
    }

    onSubmit() {
        this.isSubmitted = true;
        if (this.changepasswordForm.invalid) {
            return;
        }
        this.toastService.showLoading();
        this.userService
            .changePassword(this.changepasswordForm)
            .subscribe((data) => {
                this.isSubmitted = false;
                this.toastService.clearLoading();
                if (data.error.code) {
                    this.toastService.error(data.error.message);
                } else {
                    this.changedSuccess = true;
                    this.toastService.success(data.error.message);
                    setTimeout(() => {
                        this.userLogout();
                    }, 100);

                }
            });
    }

    userLogout() {
        this.userService.logout().subscribe((response) => {
            if (
                response.error &&
                response.error.code === AppConst.SERVICE_STATUS.SUCCESS
            ) {
                sessionStorage.removeItem('user_context');
                sessionStorage.removeItem('login_time');
                sessionStorage.removeItem('access_token');
                sessionStorage.removeItem('refresh_token');
                this.router.navigate(['/']);
                setTimeout(() => {
                    location.reload();
                }, 100);
            } else {
                this.toastService.error(response.error.message);
            }
            this.toastService.clearLoading();
        });
    }

    back() {
        this._location.back();
    }
}
