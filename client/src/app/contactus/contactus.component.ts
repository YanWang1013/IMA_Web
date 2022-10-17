
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from '../api/services/toast-service';
import { UserService } from '../api/services/user.service';
import { ContactUs } from '../api/models/contactus';
import { BaseComponent } from '../base.component';

@Component({
    selector: 'app-contactus',
    templateUrl: './contactus.component.html',
    styleUrls: ['./contactus.component.scss'],
    animations: [routerTransition()]
})
export class ContactusComponent extends BaseComponent implements OnInit {
    public contactUsForm: FormGroup;
    public submitted: boolean;
    public contactus: ContactUs = new ContactUs();
    constructor(
        public router: Router,
        private formBuilder: FormBuilder,
        private userService: UserService,
        private toastService: ToastService,
    ) {
      super();
    }
    ngOnInit() {
        this.contactUsForm = this.formBuilder.group(
            {
              name: ['', Validators.required],
              email: ['', [Validators.required]],
              subject: ['', [Validators.required]],
              phone: ['', [Validators.required]],
              message: ['', [Validators.required]]
            }
        );
    }
    get f() {
        return this.contactUsForm.controls;
    }
    onSubmit() {
        this.submitted = true;
        if (this.contactUsForm.invalid) {
            return;
        }
        delete this.contactUsForm.value.confirm_password;
        this.toastService.showLoading();
        this.userService.sendContactUs(this.contactUsForm).subscribe((data) => {
            this.submitted = false;
            this.toastService.clearLoading();
            if (data.error.code) {
                this.toastService.error(data.error.message);
            } else {
                this.toastService.success(data.error.message);
            }
        });
    }
    onKeydown(event): void {
        if (event.key === 'Enter') {
            this.onSubmit();
        }
    }

}
