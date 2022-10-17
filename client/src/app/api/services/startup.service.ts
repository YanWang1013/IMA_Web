import { Injectable } from '@angular/core';
import { AppConst } from '../../utils/app-const';
import { ApiService } from './api.service';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable()
export class StartupService {
    private baseUrl: string = environment.apiEndPoint;
    private _startupData: any;

    constructor(private http: HttpClient) { }

    // This is the method you want to call at bootstrap
    // Important: It should return a Promise
    load(): Promise<any> {
        this._startupData = null;
        return this.httpGetPromise(AppConst.SERVER_URL.SETTINGS);
    }

    getHeaders() {
        let addHeaders: HttpHeaders = new HttpHeaders();
        addHeaders = addHeaders.append('Accept', 'application/json');
        addHeaders = addHeaders.append('Content-Type', 'application/json');
     }

    /**
     * Performs a request with `Get Promise` http method.
     */
    httpGetPromise(url: string) {
        this.getHeaders();
        return this.http
        .get(this.baseUrl + url)
        .toPromise()
        .then((data: any) => this._startupData = data.data)
        .catch((err: any) => Promise.resolve());
    }

    startupData(): any {
        return this._startupData;
    }

    setStartupData(data: any): any {
        this._startupData = data;
    }
}
