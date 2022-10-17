
import { Detail } from './detail';
import { Color } from './color';
import { User } from './user';
import { Coupon } from './coupon';
import { Error } from './error';
import { Attachment } from './attachment';
export interface Product {
    id: number;
    user_id: number;
    name: string;
    description: string;
    price: number;
    quantity?: number;
    product_size_id?: number;
    user: User;
    details?: Detail[];
    detail?: Detail;
    colors: Color[];
    showDetail?: any;
    product_detail_id?: number;
    data?: any;
    coupon?: Coupon;
    error: Error;
}
