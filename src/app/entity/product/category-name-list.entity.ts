import { categoryNameListItemModel } from "../../core/domain/product/category-name-list.model";
import { ResponseModel } from "../../core/domain/response.model";

export interface CategoryNameListEntity extends ResponseModel<categoryNameListItemModel[]> {
    
}