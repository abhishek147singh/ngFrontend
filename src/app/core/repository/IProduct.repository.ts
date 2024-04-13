import { Observable } from "rxjs";
import { ProductModel } from "../domain/product/product.model";
import { ProductListItemModel } from "../domain/product/product-list-item.model";
import { CategoryListItemModel } from "../domain/product/category-list-item.model";

export abstract class IProductRepository{
    abstract getProductList():Observable<ProductListItemModel[]>;

    abstract getProductDetails(id:string):Observable<ProductModel>;

    abstract getCategoryList():Observable<CategoryListItemModel[]>;
}