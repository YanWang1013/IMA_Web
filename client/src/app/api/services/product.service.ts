
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { AppConst } from '../../utils/app-const';
import { Observable } from 'rxjs';

import { Product } from '../models/product';
import { QueryParam } from '../models/query-param';
import { Coupon } from '../models/coupon';
import { ProductList } from '../models/product-list';
@Injectable()
export class ProductService {
    constructor(private apiService: ApiService) {}

    getAll(queryParam: QueryParam): Observable<ProductList> {
        const products: string = AppConst.SERVER_URL.PRODUCTS;
        return this.apiService.httpGet(products, queryParam);
    }

    addToCart(queryParam: QueryParam | QueryParam[], isAuth: boolean): Observable<Product> {
        const url: string = (isAuth) ? AppConst.SERVER_URL.CART : AppConst.SERVER_URL.OFFLINECART;
        return this.apiService.httpPut(url, queryParam);
    }

    deleteCart(queryParam: QueryParam, isAuth: boolean): Observable<Product> {
        let url: string = (isAuth) ? AppConst.SERVER_URL.CART : AppConst.SERVER_URL.OFFLINECART;
        url = url + '/' + queryParam.id;
        return this.apiService.httpDelete(url, queryParam);
    }

    cart(queryParam: QueryParam | QueryParam[], isAuth: boolean): Observable<ProductList> {
        const url: string = (isAuth) ? AppConst.SERVER_URL.CART : AppConst.SERVER_URL.OFFLINECART;
        return this.apiService.httpGet(url, queryParam);
    }

    productAdd(request: any): Observable<any> {
        const url: string =
            AppConst.SERVER_URL.PRODUCT;
        return this.apiService.httpPost(url, request);
    }

    productEdit(request: any, id: number): Observable<any> {
        const url: string =
            AppConst.SERVER_URL.PRODUCT + '/' + id;
        return this.apiService.httpPut(url, request);
    }
}
