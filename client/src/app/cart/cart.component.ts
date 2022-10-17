
import { Router } from '@angular/router';
import { AppConst } from '../utils/app-const';
import { Component, OnInit } from '@angular/core';
import { ProductList } from '../api/models/product-list';
import { QueryParam } from '../api/models/query-param';
import { Product } from '../api/models/product';
import { ToastService } from '../api/services/toast-service';
import { ProductService } from '../api/services/product.service';
import { SessionService } from '../api/services/session-service';
import { StartupService } from '../api/services/startup.service';
@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
    public cartList: ProductList;
    public totalAmount = 0;
    public settings: any;
    public isNodata: boolean;
    public isMyOrder: boolean;
    public productDetail: Product;
    public productDetails: Product[] = [];
    constructor(protected router: Router,
        private productService: ProductService,
        private toastService: ToastService,
        public sessionService: SessionService,
        public startupService: StartupService) {
    }

    ngOnInit(): void {
        this.settings = this.startupService.startupData();
        this.toastService.showLoading();
        this.isMyOrder = (this.router.url === '/myorder');
        this.getCart();
    }

    getCart(): void {
        this.isNodata = true;
        const queryParam: QueryParam = {
            is_purchase: this.isMyOrder,
            is_web: true
        };
        this.productService.cart(queryParam, this.sessionService.isAuth).subscribe((response) => {
            this.cartSuccessHandler(response);
        });
    }

    cartSuccessHandler(response: any) {
        this.cartList = response;
        if (
            this.cartList.error &&
            this.cartList.error.code !== AppConst.SERVICE_STATUS.SUCCESS
        ) {
            this.toastService.error(this.cartList.error.message);
        } else {
            if (this.cartList && this.cartList.data.length !== 0) {
                this.isNodata = false;
                this.productDetails = this.cartList.data;
                this.totalAmount = this.cartList.total_amount;
                this.addInitialProducts();
            }
        }
        this.toastService.clearLoading();
    }

    addToCart(product: Product) {
        if (this.sessionService.isAuth) {
            const queryParam: QueryParam[] = [];
            if (product.showDetail.cart.quantity === 0) {
                this.toastService.error('Please add quantity');
                return;
            }
            queryParam.push({
                    product_detail_id: product.showDetail.id,
                    product_size_id: product.showDetail.cart.size,
                    quantity: product.showDetail.cart.quantity,
                    coupon_code: product.showDetail.cart.coupon.coupon_code
                });
            this.toastService.showLoading();
            this.productService.addToCart(queryParam, this.sessionService.isAuth).subscribe((response) => {
                this.productDetail = response;
                if (
                    this.productDetail.error &&
                    this.productDetail.error.code !== AppConst.SERVICE_STATUS.SUCCESS
                ) {
                    product.showDetail.cart.coupon_code = '';
                    this.toastService.error(this.productDetail.error.message);
                } else {
                    this.toastService.success(this.productDetail.error.message);
                }
                this.toastService.clearLoading();
            });
        } else {
            this.router.navigate(['/login']);
        }
    }

    editCart(product: Product) {
        if (product.showDetail.cart.quantity === 0) {
            this.toastService.error('Please add quantity');
            return;
        }
        const queryParam: QueryParam = {
            product_detail_id: product.product_detail_id,
            product_size_id: product.product_size_id,
            quantity: product.showDetail.cart.quantity,
            coupon_code: product.showDetail.cart.coupon.coupon_code
        };
        this.productService.addToCart(queryParam, this.sessionService.isAuth).subscribe((response) => {
            this.productDetail = response;
            if (
                this.productDetail.error &&
                this.productDetail.error.code !== AppConst.SERVICE_STATUS.SUCCESS
            ) {
                if (this.productDetail.error.message === 'Please enter a valid coupon code') {
                    product.showDetail.cart.coupon.coupon_code = '';
                }
                this.toastService.error(this.productDetail.error.message);
            } else {
                this.cartSuccessHandler(response);
            }
            this.toastService.clearLoading();
        });
    }

    deleteCart(cart: Product) {
        const queryParam: QueryParam = {
            id: cart.id
        };
        this.toastService.showLoading();
        this.productService.deleteCart(queryParam, this.sessionService.isAuth).subscribe((response) => {
            this.productDetail = response;
            if (
                this.productDetail.error &&
                this.productDetail.error.code !== AppConst.SERVICE_STATUS.SUCCESS
            ) {
                cart.showDetail.cart.coupon_code = '';
                this.toastService.error(this.productDetail.error.message);
            } else {
                this.getCart();
                this.toastService.success(this.productDetail.error.message);
            }
            this.toastService.clearLoading();
        });
    }

    addInitialProducts() {
        this.productDetails.forEach(product => {
            product = this.formatProduct(product);
        });
    }

    addQuantity(product: Product) {
        product.showDetail.cart.quantity = (!product.showDetail.cart.quantity) ? 0 :
        product.showDetail.cart.quantity;
        if (product.showDetail.cart.quantity < product.showDetail.amount_detail.quantity) {
            product.showDetail.cart.quantity = ++product.showDetail.cart.quantity;
            if (product.showDetail.cart.quantity > 0) {
                this.editCart(product);
            } else {
                this.deleteCart(product);
            }
        }
    }

    removeQuantity(product: Product) {
        product.showDetail.cart.quantity = (!product.showDetail.cart.quantity) ? 0 :
        product.showDetail.cart.quantity;
        if (product.showDetail.cart.quantity !== 0) {
            product.showDetail.cart.quantity = --product.showDetail.cart.quantity;
        }
        if (product.showDetail.cart.quantity > 0) {
            this.editCart(product);
        } else {
            this.deleteCart(product);
        }
    }

    formatProduct(product: Product) {
        product.showDetail = product.detail;
        product.showDetail.panelImage = product.detail.attachment;
        product.showDetail.cart = {
            quantity: product.quantity,
            size: product.product_size_id,
            coupon: {
                coupon_code: '',
                isValid: false
            }
        };
        if (product.coupon && product.coupon.coupon_code) {
            product.showDetail.cart.coupon.isValid = true;
            product.showDetail.cart.coupon.coupon_code = product.coupon.coupon_code;
        } else {
            product.showDetail.cart.coupon.coupon_code = '';
        }
        if (product.showDetail.amount_detail && product.showDetail.amount_detail.discount_price) {
            product.showDetail.cart.discount_price = product.showDetail.amount_detail.discount_price;
        } else {
            product.showDetail.cart.discount_price = '';
        }
        return product;
    }

    trackById(index: number, el: any): number {
        return el.id;
    }

    checkout() {
        const url = 'checkout/cart';
        this.router.navigate([url]);
    }
}
