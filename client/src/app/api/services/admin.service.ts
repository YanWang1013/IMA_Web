
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { QueryParam } from '../models/query-param';
import { AppConst } from '../../utils/app-const';
@Injectable()
export class AdminService {
    constructor(private apiService: ApiService) {}

    dashboard(request: any): Observable<any> {
        const dashboardUrl: string = AppConst.SERVER_URL.DASHBOARD;
        return this.apiService.httpGet(dashboardUrl, request);
    }
}
