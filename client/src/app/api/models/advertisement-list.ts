
import { Advertisement } from './advertisement';
import { Metadata } from './metadata';
import { Error } from './error';
import { ServiceResponse } from './service-response';
export interface AdvertisementList extends ServiceResponse {
    data: Advertisement[];
    _metadata: Metadata;
    error: Error;
}
