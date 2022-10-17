import { Size } from './size';
import { Error } from './error';
import { ServiceResponse } from './service-response';

export interface SizeList extends ServiceResponse {
    data: Size[];
    error: Error;
}
