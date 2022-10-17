
import { Component, OnInit } from '@angular/core';
import { ToastService } from '../api/services/toast-service';
import { AdvertiserService } from '../api/services/advertisers.service';
import { AdvertisementList } from '../api/models/advertisement-list';
import { AppConst } from '../utils/app-const';
import { BaseComponent } from '../base.component';
import { QueryParam } from '../api/models/query-param';
@Component({
    selector: 'app-advertisers',
    templateUrl: './advertisers.component.html',
    styleUrls: ['./advertisers.component.scss']
})
export class AdvertisersComponent extends BaseComponent implements OnInit {
    public advertisementList: AdvertisementList;
    public isNodata: boolean;
    constructor(
        private advertiserService: AdvertiserService,
        private toastService: ToastService
    ) {
        super();
    }

    ngOnInit(): void {
        this.getAdvertisers();
    }

    getAdvertisers(): void {
        this.toastService.showLoading();
        this.isNodata = true;
        const queryParam: QueryParam = {
            page: 1,
            sortby: 'desc'
        };
        this.advertiserService.getAll(queryParam).subscribe((data) => {
            this.advertisementList = data;
            if (
                this.advertisementList.error &&
                this.advertisementList.error.code !==
                    AppConst.SERVICE_STATUS.SUCCESS
            ) {
                this.toastService.error(this.advertisementList.error.message);
            } else {
                if (!this.advertisementList.data || this.advertisementList.data.length !== 0) {
                    this.isNodata = false;
                }
            }
            this.toastService.clearLoading();
        });
    }

    trackById(index: number, el: any): number {
        return el.id;
    }
}
