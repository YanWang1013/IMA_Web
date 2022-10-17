
import { Attachment } from './attachment';
import { ProductSize } from './product-size';
import { AmountDetail } from './amount-detail';
export interface Detail {
    id: number;
    product_id: number;
    product_color_id: number;
    attachments?: Attachment[];
    attachment: Attachment;
    sizes: ProductSize[];
    panelImage?: Attachment;
    amount_detail: AmountDetail;
}
