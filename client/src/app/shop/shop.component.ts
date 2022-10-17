import { element } from 'protractor';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ToastService } from '../api/services/toast-service';
import { ProductService } from '../api/services/product.service';
import { ServiceResponse } from '../api/models/service-response';
import { ProductList } from '../api/models/product-list';
import { User } from '../api/models/user';
import { Attachment } from '../api/models/attachment';
import { AppConst } from '../utils/app-const';
import { BaseComponent } from '../base.component';
import { QueryParam } from '../api/models/query-param';
import { Product } from '../api/models/product';
import { ProductSize } from '../api/models/product-size';
import { SessionService } from '../api/services/session-service';
import { StartupService } from '../api/services/startup.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-shop',
    templateUrl: './shop.component.html',
    styleUrls: ['./shop.component.scss']
})
export class ShopComponent extends BaseComponent implements OnInit {
    public productList: ProductList;
    public isNodata: boolean;
    public settings: any;
    public productDetail: Product;
    public productDetails: Product[] = [];
    public isMyproduct = false;
    public role_id: number;
    public attachmentIndex = 0;
    public attachments: any = [];
    public q: string;
    public offlineCart: any = [];
    public modalReference = null;
    public priceSlider: any;
    public filterBy = 'Filter By All';

    constructor(
        protected router: Router,
        private productService: ProductService,
        private toastService: ToastService,
        public sessionService: SessionService,
        public startupService: StartupService,
        private modalService: NgbModal
    ) {
        super();
    }

    ngOnInit(): void {
        this.settings = this.startupService.startupData();
        this.role_id = undefined;
        this.q = undefined;
        this.getProducts();
    }

    role(id: number, by: string) {
        this.role_id = (id !== 0) ? id : undefined;
        this.filterBy = by;
    }

    getProducts(): void {
        this.toastService.showLoading();
        this.isNodata = true;
        const queryParam: QueryParam = {};
        queryParam.page = 1;
        queryParam.sortby = 'desc';
        if (this.role_id) {
            queryParam.role_id = this.role_id;
        }
        if (this.q) {
            queryParam.q = this.q;
        }
        this.productService.getAll(queryParam).subscribe((response) => {
            this.productList = response;
            if (
                this.productList.error &&
                this.productList.error.code !== AppConst.SERVICE_STATUS.SUCCESS
            ) {
                this.toastService.error(this.productList.error.message);
            } else {
                if (this.productList && this.productList.data && this.productList.data.length !== 0) {
                    this.isNodata = false;
                    this.productDetails = this.productList.data;
                } else {
                    this.isNodata = true;
                    this.productDetails = [];
                }
            }
            this.toastService.clearLoading();
        });
    }

    trackById(index: number, el: any): number {
        return el.id;
    }
}
