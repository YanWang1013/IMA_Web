
import { UserContest } from './user-contest';
import { Error } from './error';
import { ServiceResponse } from './service-response';

export interface UserContestList extends ServiceResponse {
    data: UserContest[];
    max_limit: number;
    error: Error;
}
