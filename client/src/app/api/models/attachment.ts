
export interface Attachment {
    id: number;
    class: string;
    foreign_id: number;
    user_id?: any;
    product_detail_id: number;
    filename: string;
    dir: string;
    mimetype: string;
    height: number;
    width: number;
    is_primary: number;
    thumb: Attachment;
}
