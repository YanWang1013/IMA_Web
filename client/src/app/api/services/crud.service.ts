
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { QueryParam } from '../models/query-param';
@Injectable()
export class CrudService {
    constructor(private apiService: ApiService) {}

    get(url, request: any): Observable<any> {
        return this.apiService.httpGet(url, request);
    }

    post(url, request: any, queryParam: QueryParam): Observable<any> {
        return this.apiService.httpPost(url, request, queryParam);
    }

    postFile(url, request: any, queryParam: QueryParam): Observable<any> {
        return this.apiService.httpPostFile(url, request, queryParam);
    }

    put(url, request: any, queryParam: QueryParam): Observable<any> {
        return this.apiService.httpPut(url, request, queryParam);
    }

    delete(url, request: any, queryParam: QueryParam): Observable<any> {
        return this.apiService.httpDelete(url, request, queryParam);
    }
}
