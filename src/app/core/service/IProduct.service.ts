import { Observable } from "rxjs";
import { ProductModel } from "../domain/product/product.model";
import { ProductListItemModel } from "../domain/product/product-list-item.model";
import { CategoryListItemModel } from "../domain/product/category-list-item.model";
import { SimpleResponse } from "../domain/simple-response.model";
import { ReviewListItemModel } from "../domain/product/review-list-item.model";

export abstract class IProductService{
    abstract getProductList():Observable<ProductListItemModel[]>;

    abstract getProductDetails(id:string):Observable<ProductModel>;

    abstract getCategoryList():Observable<CategoryListItemModel[]>;

    abstract saveReview(rating:number, message:string, productId:string):Observable<SimpleResponse>;

    abstract getProductReviewList(productId:string):Observable<ReviewListItemModel[]>;
}