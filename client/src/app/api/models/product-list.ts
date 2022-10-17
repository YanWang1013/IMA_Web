
import { Product } from './product';
import { Metadata } from './metadata';
import { Error } from './error';
export interface ProductList {
    data: Product[];
    _metadata?: Metadata;
    cart_count?: number;
    total_amount?: number;
    error: Error;
}
