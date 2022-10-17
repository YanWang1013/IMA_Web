
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from '../api/services/toast-service';
import { UserService } from '../api/services/user.service';
import { SessionService } from '../api/services/session-service';
import { UserBaseComponent } from '../user.base.component';
import { User } from '../api/models/user';
import { QueryParam } from '../api/models/query-param';

@Component({
    selector: 'app-editprofile',
    templateUrl: './editprofile.component.html',
    styleUrls: ['./editprofile.component.scss']
})
export class EditprofileComponent extends UserBaseComponent implements OnInit {
    public isSubmitted: boolean;
    public userId: number;
    public userClass = 'UserAvatar';
    public multiple = 'multiple';
    public user: User;
    public profileImageName = '';
    public profileImageFile: any = [];
    constructor(
        protected router: Router,
        private formBuilder: FormBuilder,
        protected toastService: ToastService,
        protected userService: UserService,
        private sessionService: SessionService
    ) {
        super(router, userService, toastService);
    }

    ngOnInit(): void {
        this.editProfileForm = this.formBuilder.group({
            first_name: ['', [Validators.required]],
            last_name: ['', [Validators.required]],
            username: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            address: this.formBuilder.group({
                addressline1: ['', [Validators.required]],
                addressline2: ['', [Validators.required]],
                city: ['', [Validators.required]],
                state: ['', [Validators.required]],
                country: ['', [Validators.required]],
                zipcode: ['', [Validators.required]]
            }),
            paypal_email: ['', [Validators.email]],
            instagram_url: [''],
            tiktok_url: [''],
            youtube_url: [''],
            twitter_url: [''],
            facebook_url: ['']
        });
        if (this.sessionService.user) {
            if (this.sessionService.user.role.name !== 'User') {
                this.editProfileForm.controls['paypal_email'].setValidators([Validators.required]);
                this.editProfileForm.get('paypal_email').updateValueAndValidity();
            }
            this.userId = this.sessionService.user.id;
            this.getUser(true);
        } else {
            this.router.navigate(['/']);
        }
    }

    get f() {
        return this.editProfileForm.controls;
    }
    get address() {
        return this.editProfileForm.controls['address'];
    }

    gotoTop() {
        window.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
    }

    attachment(event: any) {
       if (event.attachment) {
            this.userService
                .updateImage({image: event.attachment})
                .subscribe((response) => {
                    this.toastService.clearLoading();
                    if (response.error.code) {
                        this.toastService.error(response.error.message);
                    } else {
                        this.getUser(true);
                        this.gotoTop();
                    }
                });
        }
    }

    onSubmit() {
        this.isSubmitted = true;
        if (this.editProfileForm.invalid) {
            return;
        }
        const queryParam: QueryParam = {
            first_name: this.editProfileForm.value.first_name,
            last_name: this.editProfileForm.value.last_name,
            username: this.editProfileForm.value.username,
            email: this.editProfileForm.value.email,
            addressline1: this.editProfileForm.value.address.addressline1,
            addressline2: this.editProfileForm.value.address.addressline2,
            city: this.editProfileForm.value.address.city,
            state: this.editProfileForm.value.address.state,
            country: this.editProfileForm.value.address.country,
            zipcode: this.editProfileForm.value.address.zipcode,
            paypal_email: this.editProfileForm.value.paypal_email,
            instagram_url: this.editProfileForm.value.instagram_url,
            tiktok_url: this.editProfileForm.value.tiktok_url,
            youtube_url: this.editProfileForm.value.youtube_url,
            twitter_url: this.editProfileForm.value.twitter_url,
            facebook_url: this.editProfileForm.value.facebook_url,
            profile_image_name: this.profileImageName,
        };
        this.toastService.showLoading();
        this.userService
            .updateUser(this.profileImageFile, queryParam)
            .subscribe((data) => {
                this.isSubmitted = false;
                this.toastService.clearLoading();
                if (data.error.code) {
                    this.toastService.error(data.error.message);
                } else {
                    this.toastService.success(data.error.message);
                    if (data.relogin_flag) {
                        // this.userService.logout();
                        // window.location.reload();
                        setTimeout(function() {
                            window.location.reload();
                        }, 2000);
                    } else {
                        this.gotoTop();
                    }
                }
            });
    }

    uploadImage(event) {
        const formData: any = new FormData();
        if (event.target.files.length > 0) {
            Array.from(event.target.files).forEach((element: any) => {
                formData.append('file[]', element, element.name);
                this.profileImageName = element.name;
            });
            this.profileImageFile = formData;
        } else {
            this.profileImageFile = '';
            this.profileImageName = '';
        }
    }
}
