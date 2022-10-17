
import { ServiceResponse } from './service-response';
export class ContactUs extends ServiceResponse {
    access_token?: string;
    scope?: string;
    id?: number;
    name?: string;
    email?: string;
    phone?: any;
    subject?: string;
    message?: string;
}
