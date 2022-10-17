import { ActivatedRoute, Router } from '@angular/router';
import { Component, Inject, OnInit } from '@angular/core';
import { ToastService } from '../api/services/toast-service';
import { UserService } from '../api/services/user.service';
import { SessionService } from '../api/services/session-service';
import { UserBaseComponent } from '../user.base.component';
import { QueryParam } from '../api/models/query-param';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../api/models/user';
import { CategoryService } from '../api/services/category.service';
import { UserCategoryList } from '../api/models/user-category-list';
import { UserCategory } from '../api/models/user-category';
import { CategoriesList } from '../api/models/categories-list';
import { AppConst } from '../utils/app-const';
import { DOCUMENT } from '@angular/common';
@Component({
    selector: 'app-contestantprofile',
    templateUrl: './contestantprofile.component.html',
    styleUrls: ['./contestantprofile.component.scss']
})
export class ContestantprofileComponent extends UserBaseComponent  implements OnInit {
    public userCategoryList: UserCategoryList;
    public userCategories: UserCategory[];
    public categoriesList: CategoriesList;
    public catList = [];
    public category_id: number;
    public catId: any;
    public location = '';
    public caption = '';
    public imageList: any = [];
    public image: any;
    public video: any;
    public isvideo = false;
    public ispaid = true;
    public categoryIndex = 0;
    public attachmentIndex = 0;
    public attachmentsLength = 0;
    public slug = '';
    public modalReference = null;
    public isUploadAttachment = false;
    constructor(
        protected router: Router,
        protected userService: UserService,
        protected toastService: ToastService,
        private activatedRoute: ActivatedRoute,
        public sessionService: SessionService,
        public categoryService: CategoryService,
        private modalService: NgbModal,
        @Inject(DOCUMENT) private document: Document
    ) {
        super(router, userService, toastService);
    }

    ngOnInit(): void {
        this.username = this.activatedRoute.snapshot.paramMap.get('username');
        this.slug = this.activatedRoute.snapshot.paramMap.get('slug');
        // if (this.sessionService && this.sessionService.user &&
        //    this.sessionService.user.username === this.username) {
            this.getCategories();
        // }
        if (this.activatedRoute.snapshot.paramMap.get('slug')) {
            this.categoryService.getAll(null).subscribe((response) => {
                this.categoriesList = response;
                this.categoriesList.data.forEach(category => {
                    if (category.slug === this.activatedRoute.snapshot.paramMap.get('slug')) {
                        this.categoryId = category.id;
                        this.getUser(null);
                        return;
                    }
                });
            });
        } else if (this.username) {
            this.getUser(null);
        } else {
            this.router.navigate(['/']);
        }
    }

    getCategories() {
        // this.catList.push({id: 0, name: '---'});
        this.categoryService
            .getUserCategory(this.username, null)
            .subscribe((response) => {
                this.userCategoryList = response;
                this.userCategories = this.userCategoryList.data;
                this.userCategories.forEach((uc: UserCategory) => {
                    this.catList.push({id: uc.category_id, name: uc.category.name});
                });
                // this.catId = this.catList[0];
                // if (this.categoryId && this.categoryId !== 0) {
                //     this.catId = this.categoryId;
                // } else {
                //     // this.catId = this.userCategories[0].category.id;
                // }
            });
    }

    open(content, isUpload, categoryIndex, attachmentIndex, attachmentsLength, isViewMore) {
        // if (isViewMore) {
            this.isUploadAttachment = isUpload;
            this.categoryIndex = categoryIndex;
            this.attachmentsLength = attachmentsLength;
            this.attachmentIndex = attachmentIndex;
            this.modalReference = this.modalService.open(content);
            this.modalReference.result.then((result) => {
            }, (reason) => {
            });
        // }
    }

    next() {
        this.attachmentIndex = ++this.attachmentIndex;
    }

    prev() {
        this.attachmentIndex = --this.attachmentIndex;
    }

    uploadImage(event) {
        const formData: any = new FormData();
        if (event.target.files.length > 0) {
            Array.from(event.target.files).forEach((element: any) => {
                formData.append('file[]', element, element.name);
            });
            this.imageList = formData;
        } else {
            this.imageList = '';
        }
    }

    uploadVideo(parentEvent) {
        // https://stackblitz.com/edit/video-thumbnail?file=app%2Fvideo-processing-service.ts
        const formData: FormData = new FormData();
        const videoName: string = parentEvent.target.files[0].name;
        const file: any = parentEvent.target.files[0];
        const video: HTMLVideoElement = this.document.createElement('video');
        const canvas: HTMLCanvasElement = this.document.createElement('canvas');
        const context: CanvasRenderingContext2D = canvas.getContext('2d');
        return new Promise<string>((resolve, reject) => {
            canvas.addEventListener('error',  reject);
            video.addEventListener('error',  reject);
            video.addEventListener('canplay', event => {
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
                formData.append('file[]', parentEvent.target.files[0], videoName);
                const imageName = videoName.split('.');
                formData.append('image[]', this.dataURItoBlob(canvas.toDataURL('image/jpeg')), 'thumb_' + imageName[0] + '.jpg');
                this.imageList = formData;
                resolve(canvas.toDataURL());
            });
            if (file.type) {
                video.setAttribute('type', file.type);
            }
            video.preload = 'auto';
            video.src = window.URL.createObjectURL(file);
            video.load();
        });
    }

    dataURItoBlob(dataURI) {
        // convert base64/URLEncoded data component to raw binary data held in a string
        let byteString;
        if (dataURI.split(',')[0].indexOf('base64') >= 0) {
            byteString = atob(dataURI.split(',')[1]);
        } else {
            byteString = unescape(dataURI.split(',')[1]);
        }
        // separate out the mime component
        const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        // write the bytes of the string to a typed array
        const ia = new Uint8Array(byteString.length);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ia], {type: mimeString});
    }

    approval() {
        this.toastService.showLoading();
        this.userService.approval()
            .subscribe((response) => {
                if (response.error && response.error.code === AppConst.SERVICE_STATUS.SUCCESS) {
                    this.getUser(null);
                    this.toastService.success(response.error.message);
                } else if (response.error && response.error.message) {
                    this.toastService.error(response.error.message);
                }
                this.toastService.clearLoading();
            });
    }

    profileUpload() {
        if (this.location.trim() !== '' &&  this.caption.trim() !== '' && this.catId !== undefined) {
            this.toastService.showLoading();
            const queryParam: QueryParam = {
                class: 'UserProfile',
                category_id: this.catId,
                location: this.location,
                caption: this.caption,
                ispaid: (this.ispaid ? 1 : 0)
            };
            this.userService.postFile(this.imageList, queryParam)
            .subscribe((response) => {
                if (response.error && response.error.code === AppConst.SERVICE_STATUS.SUCCESS) {
                    this.catId = 1;
                   // this.userCategories[0].category.id
                    this.location = '';
                    this.caption = '';
                    this.imageList = [];
                    this.image = '';
                    this.getUser(null);
                    this.modalReference.close();
                    this.toastService.success(response.error.message);
                } else {
                    this.toastService.error(response.error.message);
                }
                this.toastService.clearLoading();
            });
        } else if (this.catId === undefined ) {
            this.toastService.error('Please select category');
        } else if (this.location.trim() === '') {
            this.toastService.error('Please enter location');
        } else if (this.caption.trim() === '') {
            this.toastService.error('Please enter caption');
        } else if (!this.isvideo && this.imageList.length === 0) {
            this.toastService.error('Please upload images');
        }
    }

    changeSelect(id: any) {
        this.catId = id;
    }

    openFb() {
        window.open('https://www.facebook.com/sharer/sharer.php?u=https://itstheimasapp.com/vote/' + this.slug, 'pop'
        , 'width=600, height=400, scrollbars=no');
    }

    openTwitter() {
        window.open('https://twitter.com/intent/tweet?url=https://itstheimasapp.com/vote/' + this.slug + '&via=' + this.slug, 'pop',
        'width=600, height=400, scrollbars=no');
    }

    redirect(user: User, category_id): void {
        if (this.userCategories !== undefined && this.userCategories.length > 0 ) {
            let url: string = '/vote/' + user.username;
            if (category_id !== undefined) {
                url += '?category=' + category_id;
            }
            this.router.navigateByUrl(url, {state: {category_id: category_id}});
        } else {
            this.toastService.error('The contestant has no any category.');
        }
    }

    viewMore(data: any) {
        data.viewmore = true;
    }
}
