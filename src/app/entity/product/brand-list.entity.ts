import { BrandListItemModel } from "../../core/domain/product/brand-list-item.model";
import { ResponseModel } from "../../core/domain/response.model";

export interface BrandListEntity extends ResponseModel<BrandListItemModel[]>{
    
}