import { Category } from './category';
export interface UserCategory {
    id: number;
    user_id: number;
    category_id: number;
    votes: number;
    category: Category;
}
