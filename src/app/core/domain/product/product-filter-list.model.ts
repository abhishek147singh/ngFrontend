import { ProductListItemModel } from "./product-list-item.model";

export interface ProductFilterProductListItemModel{
    products:ProductListItemModel[];
    countProducts:number;
    page:number;
    pages:number;
    brand:{  _id: string; name: string; noProducts: number; image: string}[];
    category:{  _id: string; name: string; noProducts: number; image: string}[];
}