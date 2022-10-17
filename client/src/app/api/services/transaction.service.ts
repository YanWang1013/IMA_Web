import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { QueryParam } from '../models/query-param';
import { Observable } from 'rxjs';
import { AppConst } from 'src/app/utils/app-const';

@Injectable({
    providedIn: 'root'
})
export class TransactionService {
    constructor(private apiService: ApiService) {}

    getTransactionData(queryParam: QueryParam): Observable<any> {
        const transactionUrl: string =
            AppConst.SERVER_URL.TRANSACTIONS;
        return this.apiService.httpGet(transactionUrl, queryParam);
    }
}
