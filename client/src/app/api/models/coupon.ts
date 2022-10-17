import { Error } from './error';
import { ServiceResponse } from './service-response';
export interface Coupon extends ServiceResponse {
    id: number;
    quantity: number;
    price: number;
    discount_percentage: number;
    coupon_code?: string;
    valid: boolean;
    error: Error;
}
