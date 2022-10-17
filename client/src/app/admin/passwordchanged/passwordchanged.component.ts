
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from '../../api/services/toast-service';
import { UserService } from '../../api/services/user.service';

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
        private userService: UserService
    ) {}

    ngOnInit(): void {
        this.createForm();
    }

    createForm() {
        this.changepasswordForm = this.formBuilder.group(
            {
                password: ['', [Validators.required]],
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
                    this.toastService.success(data.error.message);
                    this.createForm();
                }
            });
    }
}
