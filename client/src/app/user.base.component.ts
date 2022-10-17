
import { User } from './api/models/user';
import { Router } from '@angular/router';
import { UserService } from './api/services/user.service';
import { ToastService } from './api/services/toast-service';
import { AppConst } from './utils/app-const';
import { FormGroup } from '@angular/forms';
import { QueryParam } from './api/models/query-param';
export abstract class UserBaseComponent {
    public user: User;
    public userId: number;
    public editProfileForm: FormGroup;
    public categoryId: number;
    public albums: any = [];
    public username: string;
    constructor(
        protected router: Router,
        protected userService: UserService,
        protected toastService: ToastService
    ) {}

    getUser(callback): void {
        this.toastService.showLoading();
        let queryParam: QueryParam;
            if (this.categoryId) {
                queryParam = {
                    category_id: this.categoryId
                };
            } else {
                queryParam = null;
            }
        let usernameDetailId: string | number = this.userId;
        if (this.username) {
            usernameDetailId = this.username;
        }
        this.userService.findById(usernameDetailId, queryParam).subscribe((response) => {
            this.user = response.data;
            if (
                this.user.error &&
                this.user.error.code !== AppConst.SERVICE_STATUS.SUCCESS
            ) {
                this.router.navigate(['/']);
            }
            if (callback !== null) {
                this.patchuser(response);
            }
            if (this.user.subscribed_data && this.user.subscribed_data.length > 0) {
                let i = 0;
                let album;
                this.user.subscribed_data.forEach(element => {
                    element.attachments.forEach(attachment => {
                        attachment.index = i;
                        album = {
                            src: 'https://itstheimasapp.com/images/original/UserAvatar/762.3940550e4f1ac87d7d22e64107173515.jpg',
                            caption: 'test',
                            thumb: 'https://itstheimasapp.com/images/original/UserAvatar/762.3940550e4f1ac87d7d22e64107173515.jpg'
                        };
                        this.albums.push(album);
                        i++;
                    });
                });
                this.albums.push(album);
                i++;
            }
            this.toastService.clearLoading();
        });
    }

    patchuser(user: User) {
        this.editProfileForm.patchValue({
            first_name: user.data.first_name,
            last_name: user.data.last_name,
            username: user.data.username,
            email: user.data.email,
            address: {
                addressline1: user.data.address.addressline1,
                addressline2: user.data.address.addressline2,
                city: user.data.address.city,
                state: user.data.address.state,
                country: user.data.address.country,
                zipcode: user.data.address.zipcode
            },
            paypal_email: user.data.paypal_email
        });
    }
}
