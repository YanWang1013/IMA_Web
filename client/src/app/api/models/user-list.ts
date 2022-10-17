
import { User } from './user';
import { Metadata } from './metadata';
import { Error } from './error';
import { ServiceResponse } from './service-response';

export interface UserList extends ServiceResponse {
    data: User[];
    _metadata: Metadata;
    error: Error;
}
