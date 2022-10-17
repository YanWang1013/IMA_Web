
import { Component, OnInit, Input } from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';
import { Attachment } from 'src/app/api/models/attachment';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {environment} from '../../../environments/environment';

@Component({
    selector: 'app-attachment',
    templateUrl: './attachment.component.html',
    styleUrls: ['./attachment.component.scss']
})
export class AttachmentComponent {
    public url: string;
    public videoUrl: string;
    public imageClass = 'original';
    public cssClassString: string;
    public isVideo: boolean;
    public isPlayVideo: boolean;
    public modalReference = null;
    public defaultImage = 'https://via.placeholder.com/1920x840.png?text=IMA';
    public screenWidth = window.screen.width;
    constructor(private modalService: NgbModal) {
    }
    @Input('type')
    set class(value: string) {
        this.imageClass = value;
    }
    @Input('cssClass')
    set cssClass(value: string) {
        this.cssClassString = value;
    }

    @Input('attachment')
    set attachment(value: Attachment) {
        let host = '';
        if (environment.hostType === 'local') {
            host = 'http://localhost:8009/images/';
        } else {
            host = 'https://itstheimasapp.com/images/';
        }
        this.isVideo = (value && value.thumb) ? true : false;
        if (!this.isVideo && value && value.id) {
            const id: string = value.id.toString();
            const filename: string = value.filename.split('.').pop();
            const hash: string = Md5.hashStr(
                value.class + id + filename + this.imageClass
            ).toString();
            this.url =
                host + this.imageClass + '/' +
                value.class +
                '/' +
                id +
                '.' +
                hash +
                '.' + filename;
        } else if (this.isVideo && value.thumb.id) {
            const id: string = value.thumb.id.toString();
            const idVideo: string = value.id.toString();
            const filename: string = value.thumb.filename.split('.').pop();
            const fileVideoName: string = value.filename.split('.').pop();
            const hash: string = Md5.hashStr(
                value.thumb.class + id + filename + this.imageClass
            ).toString();
            const hashVideo: string = Md5.hashStr(
                value.class + idVideo + fileVideoName + this.imageClass
            ).toString();
            this.url =
                host + this.imageClass + '/' +
                value.thumb.class +
                '/' +
                id +
                '.' +
                hash +
                '.' + filename;
            this.videoUrl = host + this.imageClass + '/' +
                            value.class +
                            '/' +
                            idVideo +
                            '.' +
                            hashVideo +
                            '.' + fileVideoName;
        } else {
            this.url =
                'https://tanzolymp.com/images/default-non-user-no-photo-1.jpg';
        }
    }

    open(content) {
        this.modalReference = this.modalService.open(content);
        this.modalReference.result.then((result) => {
            this.isPlayVideo = true;
        }, (reason) => {
        });
    }
}
