import { Error } from './error';
import { ServiceResponse } from './service-response';
export interface Payment extends ServiceResponse {
    payUrl: string;
    verifyUrl: string;
    cancelUrl: string;
    error: Error;
}
