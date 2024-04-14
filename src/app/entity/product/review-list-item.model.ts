import { ReviewListItemModel } from "../../core/domain/product/review-list-item.model";
import { ResponseModel } from "../../core/domain/response.model";

export interface ReviewListEntity extends ResponseModel<ReviewListItemModel[]>{
    
}