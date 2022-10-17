
import { PaymentGatewaysList } from './payment-gateways-list';
import { Error } from './error';
import { ServiceResponse } from './service-response';
export interface PaymentGatewaysListData extends ServiceResponse {
    data: PaymentGatewaysList[];
    error: Error;
}
