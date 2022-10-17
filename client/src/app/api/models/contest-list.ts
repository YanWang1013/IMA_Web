import { Contest } from './contest';
import { Error } from './error';
import { ServiceResponse } from './service-response';

export interface ContestList extends ServiceResponse {
    data: Contest[];
    left_time?: number;
    error: Error;
}
