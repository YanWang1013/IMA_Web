
import { Category } from './category';
import { Error } from './error';
import { Metadata } from './metadata';
export interface CategoriesList {
    data: Category[];
    _metadata: Metadata;
    error: Error;
}
