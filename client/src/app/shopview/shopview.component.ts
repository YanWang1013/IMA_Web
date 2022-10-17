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
  selector: 'app-shopview',
  templateUrl: './shopview.component.html',
  styleUrls: ['./shopview.component.scss']
})
export class ShopViewComponent extends BaseComponent implements OnInit {

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
      this.isMyproduct = (this.router.url === '/myproducts');
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
      if (this.isMyproduct) {
          queryParam.filter_by = 'me';
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
                  this.addInitialProducts();
              } else {
                  this.isNodata = true;
                  this.productDetails = [];
              }
          }
          this.toastService.clearLoading();
      });
  }

  addInitialProducts() {
      this.productDetails.forEach(product => {
          product = this.formatProduct(product, 0);
      });
  }

  open(content, attachments) {
      this.attachments = attachments;
      this.attachmentIndex = 4;
      this.modalReference = this.modalService.open(content);
      this.modalReference.result.then((result) => {
      }, (reason) => {
      });
  }

  next() {
      this.attachmentIndex = ++this.attachmentIndex;
  }

  prev() {
      this.attachmentIndex = --this.attachmentIndex;
  }

  formatProduct(product: Product, detail: number) {
      product.showDetail = product.details[detail];
      product.showDetail.panelImage = product.details[detail].attachments[0];
      product.colors[0].isactive = true;
      product.showDetail.cart = {
          quantity: 0,
          sizes: [{
              product_detail_id: product.showDetail.id,
              product_size_id: 0,
              quantity: 0,
              isactive: true
          }],
          coupon: {
              coupon_code: '',
              isValid: false
          }
      };
      const isCart = (product.showDetail.carts.length > 0);
      if (product.showDetail.sizes.length > 0) {
          product.showDetail.cart.sizes = [];
          product.showDetail.sizes.forEach((size, index) => {
              let qty = 0;
              if (isCart) {
                  const cartObj = product.showDetail.carts.filter((value) => {
                      return (size.id === value.product_size_id);
                  });
                  if (cartObj.length > 0) {
                      qty = cartObj[0].quantity;
                      size.isactive = (index === 0 && (size.id === cartObj[0].product_size_id));
                  }
              }
              product.showDetail.cart.sizes.push({
                  product_detail_id: product.showDetail.id,
                  product_size_id: size.id,
                  quantity: qty,
                  coupon_code: product.showDetail.cart.coupon.coupon_code,
                  isactive: (index === 0)
              });
          });
      }
      if (isCart) {
          this.setDefaultValue(product);
      }
      return product;
  }

  setDefaultValue(product: Product) {
      if (product.showDetail.cart.sizes.length === 0 ||
          product.showDetail.cart.sizes[0].product_size_id === product.showDetail.carts[0].product_size_id) {
          product.showDetail.cart.quantity = product.showDetail.carts[0].quantity;
          if (product.showDetail.carts[0].coupon && product.showDetail.carts[0].coupon.coupon_code) {
              product.showDetail.cart.coupon.isValid = true;
              product.showDetail.cart.coupon.coupon_code = product.showDetail.carts[0].coupon.coupon_code;
          }
      }
  }
  trackById(index: number, el: any): number {
      return el.id;
  }

  redirect(user: User): void {
      const url: string = '/profile/' + user.id;
      this.router.navigate([url]);
  }

  changeImage(product: Product, attachment: Attachment) {
      product.showDetail.panelImage = attachment;
  }

  changeDetail(productIndex: number, index: number) {
      this.productDetails[productIndex].showDetail = this.productDetails[productIndex].details[index];
      this.productDetails[productIndex].showDetail.panelImage = this.productDetails[productIndex].details[index].attachments[0];
      this.productDetails[productIndex] = this.formatProduct(this.productDetails[productIndex], index);
  }

  addToCart(product: Product) {
      if (this.isMyproduct) {
          this.toastService.showLoading();
          const queryParam: QueryParam = {
              quantity: product.showDetail.cart.quantity
          };
          this.productService.productEdit(queryParam, product.id).subscribe((response) => {
              this.productDetail = response;
              if (
                  this.productDetail.error &&
                  this.productDetail.error.code !== AppConst.SERVICE_STATUS.SUCCESS
              ) {
                  this.toastService.error(this.productDetail.error.message);
                  this.toastService.clearLoading();
              } else {
                  this.getProducts();
              }
          });
      } else {
          const queryParam: QueryParam[] = [];
          let sizeDetailIndex = 0;
          if (product.showDetail.sizes.length > 0) {
              const sizeEmpty = product.showDetail.sizes.filter(value => {
                  return (value.isactive === true);
              });
              if (sizeEmpty.length === 0) {
                  this.toastService.warning('Please choose size');
                  return;
              }
              sizeDetailIndex  = product.showDetail.sizes.findIndex(value => {
                  return (value.isactive === true);
              });
          }
          if (product.showDetail.cart.quantity === 0) {
              this.toastService.warning('Please add quantity');
              return;
          }
          const cartObj = product.showDetail.cart.sizes[sizeDetailIndex];
          if (product.showDetail.cart.coupon.coupon_code !== '') {
              cartObj.coupon_code = product.showDetail.cart.coupon.coupon_code;
          }
          if (cartObj !== '') {
              this.toastService.showLoading();
              this.productService.addToCart(cartObj, this.sessionService.isAuth).subscribe((response) => {
                  this.productDetail = response;
                  if (
                      this.productDetail.error &&
                      this.productDetail.error.code !== AppConst.SERVICE_STATUS.SUCCESS
                  ) {
                      product.showDetail.cart.coupon_code = '';
                      this.toastService.error(this.productDetail.error.message);
                  } else {
                      this.productList.cart_count = response.data.length;
                      product.showDetail.carts.push(cartObj);
                      this.toastService.success(this.productDetail.error.message);
                  }
                  this.toastService.clearLoading();
              });
          }
      }
  }

  addQuantity(product: Product) {
      if (this.isMyproduct) {
          product.showDetail.cart.quantity = (product.showDetail.cart.quantity === 0)
          ? product.showDetail.amount_detail.quantity : product.showDetail.cart.quantity;
          if (product.showDetail.cart.quantity >= product.showDetail.amount_detail.quantity) {
              product.showDetail.cart.quantity = ++product.showDetail.cart.quantity;
              this.setQty(product);
          }
      } else {
          product.showDetail.cart.quantity = (!product.showDetail.cart.quantity) ? 0 :
          product.showDetail.cart.quantity;
          if (product.showDetail.cart.quantity < product.showDetail.amount_detail.quantity) {
              product.showDetail.cart.quantity = ++product.showDetail.cart.quantity;
              this.setQty(product);
          }
      }
  }

  removeQuantity(product: Product) {
      if (this.isMyproduct) {
          product.showDetail.cart.quantity = (product.showDetail.cart.quantity === 0)
          ? product.showDetail.amount_detail.quantity : product.showDetail.cart.quantity;
          if (product.showDetail.cart.quantity > product.showDetail.amount_detail.quantity) {
              product.showDetail.cart.quantity = --product.showDetail.cart.quantity;
              this.setQty(product);
          }
      } else {
          product.showDetail.cart.quantity = (!product.showDetail.cart.quantity) ? 0 :
          product.showDetail.cart.quantity;
          if (product.showDetail.cart.quantity !== 0) {
              product.showDetail.cart.quantity = --product.showDetail.cart.quantity;
          }
          this.setQty(product);
      }
  }

  setQty(product: Product) {
      if (product.showDetail.sizes.length > 0) {
          let size_id;
          product.showDetail.sizes.forEach(sizeElement => {
              if (sizeElement.isactive) {
                  size_id = sizeElement.id;
              }
          });
          product.showDetail.cart.sizes.forEach(sizeElement => {
              if (size_id === sizeElement.product_size_id) {
                  sizeElement.quantity = product.showDetail.cart.quantity;
              }
          });
      } else {
          product.showDetail.cart.sizes[0].quantity = product.showDetail.cart.quantity;
      }
  }

  chooseSize(size: ProductSize, product: Product) {
      if (!this.isMyproduct) {
          product.showDetail.sizes.forEach(sizeElement => {
              sizeElement.isactive = false;
          });
          size.isactive = true;
          const cartObj = product.showDetail.carts.filter((value) => {
              return (size.id === value.product_size_id);
          });
          if (cartObj[0]) {
              product.showDetail.cart.quantity = cartObj[0].quantity;
              product.showDetail.cart.coupon.coupon_code = (cartObj[0].coupon &&
                  cartObj[0].coupon.coupon_code) ? cartObj[0].coupon.coupon_code : '';
          } else {
              product.showDetail.cart.quantity = 0;
          }
      }
  }

}
