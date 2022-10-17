
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { AppConst } from '../../utils/app-const';
import { Observable } from 'rxjs';

import { CategoriesList } from '../models/categories-list';
import { WinnerList } from '../models/winner-list';
import { UserList } from '../models/user-list';
import { UserContestList } from '../models/user-contest-list';
import { ContestList } from '../models/contest-list';
import { UserCategoryList } from '../models/user-category-list';
import { SizeList } from '../models/size-list';
import { QueryParam } from '../models/query-param';

@Injectable()
export class CategoryService {
    constructor(private apiService: ApiService) {}

    getAll(queryParam: QueryParam): Observable<CategoriesList> {
        const categoriesList: string = AppConst.SERVER_URL.ALLCATEGORY;
        return this.apiService.httpGet(categoriesList, queryParam);
    }

    getContestantsHighestList(): Observable<any> {
        const contestantsList: string = AppConst.SERVER_URL.HIGHEST_VOTES_LIST;
        return this.apiService.httpGet(contestantsList, null);
    }

    getContestantsList(queryParam: QueryParam): Observable<UserList> {
        const contestantsList: string = AppConst.SERVER_URL.CONTESTANTS;
        return this.apiService.httpGet(contestantsList, queryParam);
    }

    getContestantsWinnerList(queryParam: QueryParam): Observable<UserContestList> {
        const url: string = AppConst.SERVER_URL.INSTANT_WINNER;
        return this.apiService.httpGet(url, queryParam);
    }

    getWinnerList(queryParam: QueryParam): Observable<WinnerList> {
        const contestantsList: string = AppConst.SERVER_URL.HIGHEST_VOTES;
        return this.apiService.httpGet(contestantsList, queryParam);
    }

    getRecentWinnerList(queryParam: QueryParam): Observable<UserList> {
        const contestantsList: string = AppConst.SERVER_URL.RECENT_WINNER;
        return this.apiService.httpGet(contestantsList, queryParam);
    }

    getContest(queryParam: QueryParam): Observable<ContestList> {
        const contestList: string = AppConst.SERVER_URL.CONTEST;
        return this.apiService.httpGet(contestList, queryParam);
    }

    getUserCategory(userId: number|string, queryParam: QueryParam): Observable<UserCategoryList> {
        const url: string = AppConst.SERVER_URL.USER_CATEGORY + userId;
        return this.apiService.httpGet(url, queryParam);
    }

    sizes(): Observable<SizeList> {
        const url: string = AppConst.SERVER_URL.SIZES;
        return this.apiService.httpGet(url, null);
    }
}
