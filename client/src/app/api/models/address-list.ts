import { Error } from './error';
import { ServiceResponse } from './service-response';
import { Address } from './address';
export interface AddressList {
    data: Address[];
    error: Error;
}
