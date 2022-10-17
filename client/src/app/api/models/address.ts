
export interface Address {
    id?: number;
    user_id?: number;
    name: string;
    addressline1: string;
    addressline2: string;
    city: string;
    state: string;
    country: string;
    zipcode: string;
    is_default?: number;
    data?: Address;
}
