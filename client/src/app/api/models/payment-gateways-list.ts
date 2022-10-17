
import { Attachment } from './attachment';
import { Error } from './error';
export interface PaymentGatewaysList {
    id: number;
    name: string;
    paypal_less_ten: number;
    paypal_less_ten_in_cents: number;
    paypal_more_ten: number;
    paypal_more_ten_in_cents: number;
    attachment: Attachment;
    error: Error;
}
