
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { AppConst } from '../../utils/app-const';
import { Observable } from 'rxjs';

import { AdvertisementList } from '../models/advertisement-list';
import { QueryParam } from '../models/query-param';

@Injectable()
export class AdvertiserService {
    constructor(private apiService: ApiService) {}

    getAll(queryParam: QueryParam): Observable<AdvertisementList> {
        const advertisementList: string =
            AppConst.SERVER_URL.ADVERTISEMENTS;
        return this.apiService.httpGet(advertisementList, queryParam);
    }
}
