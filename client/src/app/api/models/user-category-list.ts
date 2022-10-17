import { UserCategory } from './user-category';
import { ServiceResponse } from './service-response';
import { Error } from './error';
export interface UserCategoryList extends ServiceResponse {
    data: UserCategory[];
    error: Error;
}
