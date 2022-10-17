import { element } from 'protractor';
import { Size } from './../api/models/size';
import { Component, OnInit } from '@angular/core';
import { Product } from '../api/models/product';
import { SizeList } from '../api/models/size-list';
import { CategoryService } from '../api/services/category.service';
import { ToastService } from '../api/services/toast-service';
import { UserService } from '../api/services/user.service';
import { ProductService } from '../api/services/product.service';
import { QueryParam } from '../api/models/query-param';
import { AppConst } from '../utils/app-const';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.scss']
})
export class AddproductComponent implements OnInit {
  public product: any = {
    name: '',
    quantity: '',
    price: '',
    description: '',
    coupon_code: '',
    discount_percentage: '',
    details: [],
  };
  public sizeList: SizeList;
  public selectedColorIndex = 0;
  public sizes: Size[] = [];
  public productDetail: Product;
  public imageList: any = [];
  public images_details: any = [];
  public mainImage: any;
  public color: any;
  constructor(private categoryService: CategoryService,
    protected userService: UserService,
    public router: Router,
    protected productService: ProductService,
    protected toastService: ToastService) { }

  ngOnInit(): void {
    this.getSizes();
  }

  editColor(index: number) {
    if (this.product.details.length > 0) {
      this.product.details.forEach(color => {
        color.is_active = false;
      });
    }
    this.selectedColorIndex = index;
    this.product.details[this.selectedColorIndex].is_active = true;
    this.images_details = this.product.details[this.selectedColorIndex].images_details;
    this.mainImage = (this.images_details.length > 0) ? this.images_details[0] : '#';
  }

  addColor(value: string) {
    if (this.product.details.length > 0) {
      this.product.details.forEach(color => {
        color.is_active = false;
      });
    }
    this.selectedColorIndex = this.product.details.length;
    this.product.details[this.selectedColorIndex] = {
      color: value,
      is_active: true,
      images: [],
      images_details: []
    };
    this.images_details = [];
    this.mainImage = '#';
  }

  selectFile() {
    if (this.product.details.length === 0 || this.product.details[this.selectedColorIndex].color === '') {
      this.toastService.error('Choose colour and then upload images');
    } else {
      const fileElement: HTMLElement = document.querySelector('input[type="file"]') as HTMLElement;
      fileElement.click();
    }
  }

  addproduct() {
    let message = '';
    if (this.product.details.length === 0) {
      this.toastService.error('Images and colour is required');
      return;
    }
    this.product.details.forEach((colorDetail, index) => {
      if (colorDetail.color === '') {
        message = 'Choose colour' + index;
        return;
      }
      if (colorDetail.images.length === 0) {
        message = 'Add images for colour ' + index;
        return;
      }
    });
    if (message !== '') {
      this.toastService.error(message);
      return;
    } else if (this.product.name.trim() === '') {
      this.toastService.error('Product Name is required');
      return;
    } else if (this.product.description.trim() === '') {
      this.toastService.error('Product Description is required');
      return;
    } else if (this.product.quantity <= 0 || !Number.isInteger(this.product.quantity)) {
      this.toastService.error('Quantity is required');
      return;
    } else if (this.product.price <= 0  || !Number.isInteger(this.product.price)) {
      this.toastService.error('Price is required');
      return;
    } else if (this.product.discount_percentage !== '' &&
    (!Number.isInteger(this.product.discount_percentage) || this.product.discount_percentage >= 100)) {
      this.toastService.error('Enter discount Percentage and it\'s should be less than 100%');
      return;
    } else if (this.product.discount_percentage !== '' && this.product.coupon_code === '') {
      this.toastService.error('Coupon is required');
    }
    const details = [];
    const sizeSelected = this.sizes.filter(size => {
      return (size.isActive);
    });
    this.product.details.forEach(detail => {
      details.push({
        color: detail.color,
        quantity: this.product.quantity,
        price: this.product.price,
        discount_percentage: this.product.discount_percentage,
        coupon_code: this.product.coupon_code,
        sizes: (sizeSelected.length > 0) ? sizeSelected : [0],
        images: detail.images[0]
      });
    });
    const requestParams = {
      name: this.product.name,
      description: this.product.description,
      product_details: details
    };
    this.toastService.showLoading();
    this.productService.productAdd(requestParams).subscribe((response) => {
      const serverResponse = response;
      if (
          serverResponse.error &&
          serverResponse.error.code === AppConst.SERVICE_STATUS.SUCCESS
      ) {
          this.toastService.success(serverResponse.error.message);
          this.router.navigate(['/myproducts']);
      } else {
          this.toastService.error(serverResponse.error.message);
      }
      this.toastService.clearLoading();
    });
  }

  changeImage(value: any) {
    this.mainImage = value;
  }

  chooseSize(size: Size) {
    size.isActive = !size.isActive;
  }

  uploadImage(event) {
      const formData: any = new FormData();
      if (event.target.files.length > 0) {
          if (!this.product.details[this.selectedColorIndex] || !this.product.details[this.selectedColorIndex].images_details) {
            this.product.details[this.selectedColorIndex] = {
              images_details: [],
              images: [],
              color: '',
              is_active: true,
            };
          }
          Array.from(event.target.files).forEach((image: any, index: number) => {
              formData.append('file[]', image, image.name);
              const reader = new FileReader();
              reader.readAsDataURL(image);
              reader.onload = (imageEvent) => {
                if (index === 0) {
                  this.mainImage = reader.result;
                }
                this.product.details[this.selectedColorIndex].images_details.unshift(reader.result);
              };
          });
          this.images_details = this.product.details[this.selectedColorIndex].images_details;
          this.imageList = formData;
          this.profileUpload();
      } else {
          this.imageList = '';
      }
  }

  profileUpload() {
      this.toastService.showLoading();
      const queryParam: QueryParam = {
          class: 'Product'
      };
      this.userService.postFile(this.imageList, queryParam)
      .subscribe((response) => {
          if (response.error && response.error.code === AppConst.SERVICE_STATUS.SUCCESS) {
            this.imageList = [];
            this.product.details[this.selectedColorIndex].images.push(response.attachments);
          } else {
              this.toastService.error(response.error.message);
          }
          this.toastService.clearLoading();
      });
  }

  getSizes() {
    this.categoryService
        .sizes()
        .subscribe((response) => {
            this.sizeList = response;
            this.sizes = this.sizeList.data;
        });
  }

}
