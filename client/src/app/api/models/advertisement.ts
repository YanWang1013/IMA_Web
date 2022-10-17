
import { Attachment } from './attachment';
import { User } from './user';
export interface Advertisement {
    id: number;
    user_id: number;
    name: string;
    url: string;
    description: string;
    user: User;
    attachment: Attachment;
}
