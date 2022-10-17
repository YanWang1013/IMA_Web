import { Attachment } from './../../api/models/attachment';

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ImageService } from 'src/app/api/services/image.service';
import { QueryParam } from 'src/app/api/models/query-param';
import { ToastService } from 'src/app/api/services/toast-service';
import { AppConst } from 'src/app/utils/app-const';

@Component({
    selector: 'app-attachment-upload',
    templateUrl: './attachment-upload.component.html',
    styleUrls: ['./attachment-upload.component.css']
})
export class AttachmentUploadComponent {
    @Input() class: string;
    @Input() isMultiple: boolean;
    @Output()
    attachment: EventEmitter<any> = new EventEmitter<any>();

    constructor(public imageService: ImageService,
        protected toastService: ToastService) {
        this.isMultiple = false;
    }

    fileUpload(event) {
        this.toastService.showLoading();
        const formData: any = new FormData();
        if (this.isMultiple) {
            formData.append('file', event.target.files);
        } else {
            formData.append('file', event.target.files[0], event.target.files[0].name);
        }
        const queryParam: QueryParam = {
            class: this.class
        };
        this.imageService
            .updateUserAvatar(formData, queryParam)
            .subscribe((response) => {
                if (response.error && response.error.code === AppConst.SERVICE_STATUS.SUCCESS) {
                    this.attachment.emit(response);
                } else {
                    this.toastService.error(response.error.message);
                    this.toastService.clearLoading();
                }
            });
    }
}
