
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { PaymentService } from '../api/services/payment.service';
import { ToastService } from '../api/services/toast-service';
import { Payment } from '../api/models/payment';
import { AppConst } from '../utils/app-const';
import { QueryParam } from '../api/models/query-param';
import { UserCategoryList } from '../api/models/user-category-list';
import { UserCategory } from '../api/models/user-category';
import { AddressList } from '../api/models/address-list';
import { Address } from '../api/models/address';
import { PaymentGatewaysListData } from '../api/models/payment-gateways-list-data';
import { PaymentGatewaysList } from '../api/models/payment-gateways-list';
import { StartupService } from '../api/services/startup.service';
import { CategoryService } from '../api/services/category.service';
import { VotePackage } from '../api/models/vote-package';
import { SessionService } from '../api/services/session-service';
import { ProductService } from '../api/services/product.service';
import {UserBaseComponent} from '../user.base.component';
@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
    public payment: Payment;
    public paymentGatewaysListData: PaymentGatewaysListData;
    public paymentGateways: PaymentGatewaysList[] = [];
    public isProduct = false;
    public isFund = false;
    public fund = 'fund';
    public subscription = 'subscription';
    public cart = 'cart';
    public votes = 'votes';
    public instaVotes = 'instant_vote';
    public name: string;
    public paymentType: string;
    public payment_gatewayId: number;
    public user_address_id: number;
    public amount: number;
    public settings: any;
    public packageId: string;
    public categoryId: number;
    public username: string;
    public userCategories: UserCategory[];
    public addressList: AddressList;
    public address: Address;
    public addressArrayList: Address[] = [];
    public userCategoryList: UserCategoryList;
    public category_id: number;
    public isCategory = false;
    public votePackage: VotePackage;
    public paypalLessTen: number;
    public paypalLessTenInCents: number;
    public paypalMoreTen: number;
    public paypalMoreTenInCents: number;
    public totalAmount: number;
    public isSubscription = false;
    public customPackageCount: number;
    public displayname: string;

    constructor(
        protected router: Router,
        public paymentService: PaymentService,
        private toastService: ToastService,
        private activatedRoute: ActivatedRoute,
        public startupService: StartupService,
        public categoryService: CategoryService,
        public sessionService: SessionService,
        private productService: ProductService) {
            this.paymentType = this.activatedRoute.snapshot.paramMap.get('type');
            if (this.activatedRoute.snapshot.queryParams.username) {
                this.packageId = this.activatedRoute.snapshot.queryParams.package;
                this.username = this.activatedRoute.snapshot.queryParams.username;
                // const catId = (window.history.state.category_id) ? window.history.state.category_id : 0;
                this.customPackageCount = this.activatedRoute.snapshot.queryParams.customcount;
                // this.categoryId = +catId;
            } else if (this.paymentType && this.paymentType.indexOf('?') > -1) {
                const params = this.paymentType.split('?');
                this.paymentType = params[0];
                const types = params[1].split('&');
                const packId = types[0] ? types[0].split('=')[1] : 0;
                this.packageId = packId.toString();
                const contestantUserName = types[1] ? types[1].split('=')[1] : 0;
                this.username = contestantUserName.toString();
                const catId = types[4] ? types[4].split('=')[1] : 0;
                this.categoryId = +catId;
                this.customPackageCount = types[2] ? +types[2].split('=')[1] : 0;
                this.displayname = types[3] ? types[3].split('=')[1] : '';
            }
        }

    ngOnInit(): void {
        if (this.sessionService.user) {
            this.settings = this.startupService.startupData();
            this.paymentGateway();
            if (this.paymentType === this.fund) {
                this.name = 'Donate';
                this.isFund = true;
            } else if (this.paymentType === this.subscription) {
                this.name = 'Subscription';
                this.isSubscription = true;
            } else if (this.paymentType === this.votes) {
                this.name = 'Votes';
                this.isCategory = true;
                this.getCategories();
                this.getvotePackage();
            } else if (this.paymentType.includes(this.instaVotes)) {
                this.name = 'Instant votes';
                this.getvotePackage();
            } else if (this.paymentType === this.cart) {
                this.name = 'Cart';
                this.isProduct = true;
                this.getAddress();
                this.getCart();
            }
        } else {
            this.toastService.error('Please sign in or register to vote. Your vote matters.');
            // this.router.navigate(['/login']);
        }
    }

    getCategories() {
        this.toastService.showLoading();
        this.categoryService
            .getUserCategory(this.username, null)
            .subscribe((response) => {
                this.userCategoryList = response;
                this.userCategories = this.userCategoryList.data;
                if (this.userCategories !== undefined && this.userCategories.length > 0) {
                    if (this.categoryId !== 0 && this.categoryId !== undefined) {
                        this.category_id = this.categoryId;
                    } else {
                        this.category_id = this.userCategories[0].category.id;
                    }
                } else {
                    this.toastService.error(response.error.message);
                }
                this.toastService.clearLoading();
            });
    }

    getCart(): void {
        const queryParam: QueryParam = {
            is_purchase: false,
            is_web: true
        };
        this.productService.cart(queryParam, this.sessionService.isAuth).subscribe((response) => {
            this.totalAmount = response.total_amount;
        });
    }

    getAddress() {
        this.toastService.showLoading();
        this.paymentService
            .address(null)
            .subscribe((response) => {
                this.addressList = response;
                this.addressArrayList = (this.addressList.data.length > 0) ? this.addressList.data : [];
                const addressDetail: Address = {
                    id: 0,
                    name: 'Add New Address',
                    addressline1: '',
                    addressline2: '',
                    city: '',
                    state: '',
                    country: '',
                    zipcode: ''
                };
                this.addressArrayList.push(addressDetail);
                this.user_address_id = this.addressArrayList[0].id;
                this.address = this.addressArrayList[0];
                this.toastService.clearLoading();
            });
    }

    getvotePackage(): void {
        this.paymentService
            .votePackage(this.packageId)
            .subscribe((response) => {
              if (response) {
                this.votePackage = response;
              }
              this.toastService.clearLoading();
            });
    }

    changeAddress(address: Address) {
        this.address = address;
    }

    switchPayment() {
        if (this.paymentType === this.fund) {
            //
        }
    }

    paymentGateway() {
        this.toastService.showLoading();
        const queryParam: QueryParam = {
            is_active: true,
            sort: 'id',
            sortby: 'ASC'
        };
        this.paymentService
            .paymentGateway(queryParam)
            .subscribe((response) => {
                this.paymentGatewaysListData = response;
                this.paymentGateways = this.paymentGatewaysListData.data;
                this.payment_gatewayId = this.paymentGateways[0].id;
                this.paypalLessTen = this.paymentGateways[0].paypal_less_ten;
                this.paypalLessTenInCents = this.paymentGateways[0].paypal_less_ten_in_cents;
                this.paypalMoreTen = this.paymentGateways[0].paypal_more_ten;
                this.paypalMoreTenInCents = this.paymentGateways[0].paypal_more_ten_in_cents;
                this.toastService.clearLoading();
            });
    }

    pay() {
        if (this.paymentType === this.fund) {
            this.donate();
        } else if (this.paymentType === this.subscription) {
            this.subscriptions();
        } else if (this.paymentType === this.votes) {
            this.votePurchase();
        } else if (this.paymentType.includes(this.instaVotes)) {
            this.instantVotePurchase();
        } else if (this.paymentType === this.cart) {
            this.cartCheckout();
        }
    }

    donate() {
        if (this.amount > 1) {
            this.toastService.showLoading();
            // this.payment_gatewayId
            const queryParam: QueryParam = {
                payment_gateway_id: 1,
                amount: this.amount,
                is_web: true
            };
            this.paymentService
                .fund(queryParam)
                .subscribe((response) => {
                    this.payment = response;
                    if (
                    this.payment.error &&
                    this.payment.error.code === AppConst.SERVICE_STATUS.SUCCESS
                    ) {
                        window.location.href = this.payment.payUrl;
                    } else {
                        this.toastService.error(this.payment.error.message);
                        this.toastService.clearLoading();
                    }
                });
        } else {
            this.toastService.error('Amount should be greater then ' + this.settings.CURRENCY_CODE + '1');
        }
    }

    subscriptions() {
        this.toastService.showLoading();
        // this.payment_gatewayId
        const queryParam: QueryParam = {
            payment_gateway_id: 1,
            is_web: true
        };
        this.paymentService
            .subscription(queryParam)
            .subscribe((response) => {
                this.payment = response;
                if (
                this.payment.error &&
                this.payment.error.code === AppConst.SERVICE_STATUS.SUCCESS
                ) {
                    window.location.href = this.payment.payUrl;
                } else {
                    this.toastService.error(this.payment.error.message);
                    this.toastService.clearLoading();
                }
            });
    }

    votePurchase() {
        this.toastService.showLoading();
        if (this.category_id !== undefined) {
            // this.payment_gatewayId
            const queryParam: QueryParam = {
                payment_gateway_id: 1,
                username: this.username,
                category_id: this.category_id,
                is_web: true,
                customCount: this.customPackageCount
            };
            this.paymentService
                .votePurchase(this.packageId, queryParam)
                .subscribe((response) => {
                    this.payment = response;
                    if (this.payment.error && this.payment.error.code === AppConst.SERVICE_STATUS.SUCCESS) {
                        window.location.href = this.payment.payUrl;
                    } else {
                        this.toastService.error(this.payment.error.message);
                        this.toastService.clearLoading();
                    }
                });
        } else {
            this.toastService.error('No matched category');
            this.toastService.clearLoading();
        }
    }

    instantVotePurchase() {
        this.toastService.showLoading();
        // this.payment_gatewayId
        const queryParam: QueryParam = {
            payment_gateway_id: 1,
            username: this.username,
            is_web: true
        };
        this.paymentService
            .instantVotePurchase(this.packageId, queryParam)
            .subscribe((response) => {
                this.payment = response;
                if (
                this.payment.error &&
                this.payment.error.code === AppConst.SERVICE_STATUS.SUCCESS
                ) {
                    window.location.href = this.payment.payUrl;
                } else {
                    this.toastService.error(this.payment.error.message);
                    this.toastService.clearLoading();
                }
            });
    }

    cartCheckout() {
        if (this.address.addressline1.trim() === '') {
            this.toastService.error('Address Line 1 is required');
            return;
        } else if (this.address.country.trim() === '') {
            this.toastService.error('country is required');
            return;
        } else if (this.address.state.trim() === '') {
            this.toastService.error('State is required');
            return;
        } else if (this.address.zipcode.trim() === '') {
            this.toastService.error('Zipcode is required');
            return;
        }
        this.toastService.showLoading();
        this.paymentService
            .addOrUpdateAddress(this.address, null)
            .subscribe((response) => {
                // this.payment_gatewayId
                const queryParam: QueryParam = {
                    payment_gateway_id: 1,
                    is_web: true,
                    user_address_id: response.data.id
                };
                this.paymentService
                    .cartPurchase(queryParam)
                    .subscribe((paymentResponse) => {
                        this.payment = paymentResponse;
                        if (
                        this.payment.error &&
                        this.payment.error.code === AppConst.SERVICE_STATUS.SUCCESS
                        ) {
                            window.location.href = this.payment.payUrl;
                        } else {
                            this.toastService.error(this.payment.error.message);
                            this.toastService.clearLoading();
                        }
                    });
            });
    }

    trackById(index: number, el: any): number {
        return el.id;
    }
}
