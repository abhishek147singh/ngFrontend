import { ProductListItemModel } from "./product-list-item.model";

export interface ProductFilterProductListItemModel{
    products:ProductListItemModel[];
    countProducts:number;
    page:number;
    pages:number;
}