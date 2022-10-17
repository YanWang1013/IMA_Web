
import { HighestVotes } from './highest_votes';
import { User } from './user';
import { Error } from './error';
import { ServiceResponse } from './service-response';
export interface WinnerListData extends ServiceResponse {
    highest_votes: HighestVotes;
    category_highest_votes: User[];
    left_time?: number;
    error: Error;
}
