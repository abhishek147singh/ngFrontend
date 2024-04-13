import { ProductListItemModel } from "../../core/domain/product/product-list-item.model";
import { ResponseModel } from "../../core/domain/response.model";

export interface ProductListEntity extends ResponseModel<ProductListItemModel[]>{
    
}