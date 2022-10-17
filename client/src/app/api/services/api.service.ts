
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of, empty } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { AppConst } from '../../utils/app-const';
import { QueryParam } from '../models/query-param';

@Injectable()
export class ApiService {
    private baseUrl: string = environment.apiEndPoint;
    private token: string;
    private refreshToken: string;
    private login_time: string;
    private httpOptions: any;
    public windowTop: any = window.top;

    constructor(private http: HttpClient) {}

    getHeaders(isFile: boolean) {
        let addHeaders: HttpHeaders = new HttpHeaders();
        if (isFile) {
            addHeaders = addHeaders.append('Accept', 'multipart/form-data; charset=utf-8; boundary='
            + Math.random().toString().substr(2));
            addHeaders.set('Content-Type', null);
        } else {
            addHeaders = addHeaders.append('Accept', 'application/json');
            addHeaders = addHeaders.append('Content-Type', 'application/json');
        }
        if (sessionStorage.getItem('user_context') !== undefined && sessionStorage.getItem('user_context') !== '') {
            const access_token = sessionStorage.getItem('access_token');
            if (access_token && access_token !== null && access_token !== undefined && access_token !== 'undefined') {
                this.token = access_token;
                this.refreshToken = sessionStorage.getItem('refresh_token');
                this.login_time = sessionStorage.getItem('login_time');
            }
        } else {
            this.token = '';
            this.refreshToken = '';
            this.login_time = '';
        }
        this.httpOptions = {
            headers: addHeaders
        };
    }

    httpGet<T>(url: string, params?: QueryParam | QueryParam[]): Observable<T> {
        this.getHeaders(false);
        if (this.login_time && this.isTokenExpired()) {
            this.http
            .get<any>(this.baseUrl + '/oauth/refresh_token?token=' + this.refreshToken,
                this.httpOptions)
            .subscribe((response: any) => {
                setTimeout(() => {
                    if (response.error.code === 0) {
                        sessionStorage.setItem('access_token', response.access_token);
                        sessionStorage.setItem('refresh_token', response.refresh_token);
                        this.token = response.access_token;
                        this.getHeaders(false);
                        return this.http
                        .get<T>(
                            this.getFormattedQueryParam(url, params, 'GET'),
                            this.httpOptions
                        )
                        .pipe(catchError(this.handleNetworkErrors));
                    } else if (response.error.code === 1) {
                        sessionStorage.removeItem('user_context');
                        sessionStorage.removeItem('login_time');
                        sessionStorage.removeItem('access_token');
                        sessionStorage.removeItem('refresh_token');
                        sessionStorage.setItem('session_expired', 'true');
                        window.location.href = '/login';
                        throw throwError(null);
                    }
                }, 3000);
            });
        } else {
            return this.http
                    .get<T>(
                        this.getFormattedQueryParam(url, params, 'GET'),
                        this.httpOptions
                    )
                    .pipe(catchError(this.handleNetworkErrors));
        }
    }

    /**
     * Performs a request with `post` http method.
     */
    httpPost(url: string, body: any, params?: QueryParam): Observable<any> {
        this.getHeaders(false);
        if (this.login_time && this.isTokenExpired()) {
            this.http
            .get<any>(this.baseUrl + '/oauth/refresh_token?token=' + this.refreshToken,
                this.httpOptions)
            .toPromise()
            .then((res: any) => {
                if (res.error.code === 0) {
                    sessionStorage.setItem('access_token', res.access_token);
                    sessionStorage.setItem('refresh_token', res.refresh_token);
                    this.token = res.access_token;
                    this.getHeaders(false);
                    return this.http
                    .post(
                        this.getFormattedQueryParam(url, params, 'POST'),
                        body,
                        this.httpOptions
                    )
                    .pipe(catchError(this.handleNetworkErrors));
                } else if (res.error.code === 1) {
                    sessionStorage.removeItem('user_context');
                    sessionStorage.removeItem('login_time');
                    sessionStorage.removeItem('access_token');
                    sessionStorage.removeItem('refresh_token');
                    sessionStorage.setItem('session_expired', 'true');
                    window.location.href = '/login';
                }
            })
            .catch((err: any) => Promise.resolve());
        } else {
            return this.http
            .post(
                this.getFormattedQueryParam(url, params, 'POST'),
                body,
                this.httpOptions
            )
            .pipe(catchError(this.handleNetworkErrors));
        }
    }

    /**
     * Performs a request with `post` http method.
     */
    httpPostFile(url: string, body: any, params?: QueryParam): Observable<any> {
        this.getHeaders(true);
        if (this.login_time && this.isTokenExpired()) {
            this.http
            .get<any>(this.baseUrl + '/oauth/refresh_token?token=' + this.refreshToken,
                this.httpOptions)
            .toPromise()
            .then((res: any) => {
                if (res.error.code === 0) {
                    sessionStorage.setItem('access_token', res.access_token);
                    sessionStorage.setItem('refresh_token', res.refresh_token);
                    this.token = res.access_token;
                    this.getHeaders(false);
                    return this.http.post(
                        this.getFormattedQueryParam(url, params, 'POST'),
                        body,
                            this.httpOptions
                        )
                        .pipe(catchError(this.handleNetworkErrors));
                } else if (res.error.code === 1) {
                    sessionStorage.removeItem('user_context');
                    sessionStorage.removeItem('login_time');
                    sessionStorage.removeItem('access_token');
                    sessionStorage.removeItem('refresh_token');
                    sessionStorage.setItem('session_expired', 'true');
                    window.location.href = '/login';
                }
            })
            .catch((err: any) => Promise.resolve());
        } else {
            return this.http
            .post(
                this.getFormattedQueryParam(url, params, 'POST'),
                body,
                this.httpOptions
            )
            .pipe(catchError(this.handleNetworkErrors));
        }
    }

    /**
     * Performs a request with `put` http method.
     */
    httpPut(url: string, body: any, params?: QueryParam | QueryParam[]): Observable<any> {
        this.getHeaders(false);
        if (this.login_time && this.isTokenExpired()) {
            this.http
            .get<any>(this.baseUrl + '/oauth/refresh_token?token=' + this.refreshToken,
                this.httpOptions)
            .toPromise()
            .then((res: any) => {
                if (res.error.code === 0) {
                    sessionStorage.setItem('access_token', res.access_token);
                    sessionStorage.setItem('refresh_token', res.refresh_token);
                    this.token = res.access_token;
                    this.getHeaders(false);
                    return this.http
            .put(
                this.getFormattedQueryParam(url, params, 'PUT'),
                body,
                this.httpOptions
            )
            .pipe(catchError(this.handleNetworkErrors));
                } else if (res.error.code === 1) {
                    sessionStorage.removeItem('user_context');
                    sessionStorage.removeItem('login_time');
                    sessionStorage.removeItem('access_token');
                    sessionStorage.removeItem('refresh_token');
                    sessionStorage.setItem('session_expired', 'true');
                    window.location.href = '/login';
                }
            })
            .catch((err: any) => Promise.resolve());
        } else {
            return this.http
            .put(
                this.getFormattedQueryParam(url, params, 'PUT'),
                body,
                this.httpOptions
            )
            .pipe(catchError(this.handleNetworkErrors));
        }
    }

    /**
     * Performs a request with `delete` http method.
     */
    httpDelete(
        url: string,
        options?: any,
        params?: QueryParam
    ): Observable<any> {
        this.getHeaders(false);
        if (this.login_time && this.isTokenExpired()) {
            this.http
            .get<any>(this.baseUrl + '/oauth/refresh_token?token=' + this.refreshToken,
                this.httpOptions)
            .toPromise()
            .then((res: any) => {
                if (res.error.code === 0) {
                    sessionStorage.setItem('access_token', res.access_token);
                    sessionStorage.setItem('refresh_token', res.refresh_token);
                    this.token = res.access_token;
                    this.getHeaders(false);
                    return this.http
                    .delete(this.getFormattedQueryParam(url, params, 'DELETE'), options)
                    .pipe(catchError(this.handleNetworkErrors));
                } else if (res.error.code === 1) {
                    sessionStorage.removeItem('user_context');
                    sessionStorage.removeItem('login_time');
                    sessionStorage.removeItem('access_token');
                    sessionStorage.removeItem('refresh_token');
                    sessionStorage.setItem('session_expired', 'true');
                    window.location.href = '/login';
                }
            })
            .catch((err: any) => Promise.resolve());
        } else {
            return this.http
            .delete(this.getFormattedQueryParam(url, params, 'DELETE'), options)
            .pipe(catchError(this.handleNetworkErrors));
        }
    }

    /**
     * Handles all the network errors from the Http methods
     */
    handleNetworkErrors(errObject: HttpErrorResponse): Observable<any> {
        if (errObject.status === 0) {
            sessionStorage.removeItem('user_context');
            sessionStorage.removeItem('login_time');
            sessionStorage.removeItem('access_token');
            sessionStorage.removeItem('refresh_token');
            sessionStorage.setItem('backend_failure', 'true');
            window.location.href = '/login';
        } else if (errObject.status === 401) {
            sessionStorage.removeItem('user_context');
            sessionStorage.removeItem('login_time');
            sessionStorage.removeItem('access_token');
            sessionStorage.removeItem('refresh_token');
            sessionStorage.setItem('session_expired', 'true');
            window.location.href = '/login';
        } else if (errObject.status === 500) {
            alert(errObject.error.statusMessage);
        }
        return of(true);
    }

    /**
     * Formats the key value pair to query pair
     */
    getFormattedQueryParam(url: string, params: any, method: string): string {
        let formattedUrl: string;
        let appendToken = '';
        if (!url.includes('pages')) {
            appendToken = '?';
            if (!(AppConst.NON_AUTH_SERVER_URL.indexOf(url) > -1 || url.includes('pages')
            || url.includes('page'))) {
                if (this.token && this.token !== null && this.token !== undefined && this.token !== '') {
                    appendToken = '?token=' + this.token;
                }
            }
        }
        if (params) {
            const queryString = Object.keys(params)
                .map(function(key) {
                    return key + '=' + params[key];
                })
                .join('&');
            formattedUrl = this.baseUrl + url + appendToken + '&' + queryString;
        } else {
            formattedUrl =
                appendToken !== '?'
                    ? this.baseUrl + url + appendToken
                    : this.baseUrl + url;
        }
        return formattedUrl;
    }

    isTokenExpired() {
        const today: any = new Date();
        const loginTime: any = new Date(this.login_time);
        const diffMs: any = (loginTime - today);
        const diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);
        // console.log('diffMins', diffMins);
        // (diffMins <= 59)
        return false;
    }
}
