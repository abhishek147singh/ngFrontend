import { Observable } from "rxjs";
import { ProductModel } from "../domain/product/product.model";
import { ProductListItemModel } from "../domain/product/product-list-item.model";
import { CategoryListItemModel } from "../domain/product/category-list-item.model";
import { SimpleResponse } from "../domain/simple-response.model";
import { ReviewListItemModel } from "../domain/product/review-list-item.model";
import { categoryNameListItemModel } from "../domain/product/category-name-list.model";
import { ProductFilterProductListItemModel } from "../domain/product/product-filter-list.model";

export abstract class IProductRepository{
    abstract getProductList():Observable<ProductListItemModel[]>;

    abstract getfilterProductList(page:number, query:string, category:string, price:string, rating:string,order:string,brand:string):Observable<ProductFilterProductListItemModel>;

    abstract getProductDetails(id:string):Observable<ProductModel>;

    abstract getCategoryList():Observable<CategoryListItemModel[]>;

    abstract saveReview(rating:number, message:string, productId:string):Observable<SimpleResponse>;

    abstract getProductReviewList(productId:string):Observable<ReviewListItemModel[]>;

    abstract getCategoryNameList():Observable<categoryNameListItemModel[]>;
}