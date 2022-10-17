
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { AppConst } from '../../utils/app-const';
import { Observable } from 'rxjs';
import { VotePackageList } from '../models/vote-package-list';
import { VotePackage } from '../models/vote-package';
import { PaymentGatewaysListData } from '../models/payment-gateways-list-data';
import { Payment } from '../models/payment';
import { AddressList } from '../models/address-list';
import { Address } from '../models/address';
import { QueryParam } from '../models/query-param';

@Injectable()
export class PaymentService {
    constructor(private apiService: ApiService) {}

    paymentGateway(queryParam: QueryParam): Observable<PaymentGatewaysListData> {
        const url: string = AppConst.SERVER_URL.PAYMENT_GATEWAYS;
        return this.apiService.httpGet(url, queryParam);
    }

    address(queryParam: QueryParam): Observable<AddressList> {
        const url: string = AppConst.SERVER_URL.USER_ADDRESS;
        return this.apiService.httpGet(url, queryParam);
    }

    addOrUpdateAddress(address: Address, queryParam: QueryParam): Observable<Address> {
        const url: string = AppConst.SERVER_URL.USER_ADDRESS;
        return this.apiService.httpPost(url, address, queryParam);
    }

    votePackages(queryParam: QueryParam): Observable<VotePackageList> {
        const votePackagesList: string = AppConst.SERVER_URL.VOTEPACKAGES;
        return this.apiService.httpGet(votePackagesList, queryParam);
    }

    votePackage(id: string): Observable<VotePackage> {
        const votePackage: string = AppConst.SERVER_URL.VOTEPACKAGE + '/' + id;
        return this.apiService.httpGet(votePackage, null);
    }

    fund(queryParam: QueryParam): Observable<Payment> {
        const url: string = AppConst.SERVER_URL.FUND;
        return this.apiService.httpGet(url, queryParam);
    }

    subscription(queryParam: QueryParam): Observable<Payment> {
        const url: string = AppConst.SERVER_URL.SUBSCRIPTION;
        return this.apiService.httpGet(url, queryParam);
    }

    votePurchase(packageId: string, queryParam: QueryParam): Observable<Payment> {
        const url: string = AppConst.SERVER_URL.VOTE_PURCHASE + packageId;
        return this.apiService.httpGet(url, queryParam);
    }

    instantVotePurchase(contestId: string, queryParam: QueryParam): Observable<Payment> {
        const url: string = AppConst.SERVER_URL.INSTANT_VOTE_PURCHASE + contestId;
        return this.apiService.httpGet(url, queryParam);
    }

    cartPurchase(queryParam: QueryParam): Observable<Payment> {
        const url: string = AppConst.SERVER_URL.CART_PURCHASE;
        return this.apiService.httpGet(url, queryParam);
    }
}
