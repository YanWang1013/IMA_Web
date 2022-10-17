import { User } from './user';
export class UserContest {
    id: number;
    contest_id: number;
    instant_votes: number;
    user_id: number;
    user: User;
    percentage: string;
}
