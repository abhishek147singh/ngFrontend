import { Injectable } from "@angular/core";
import { IProductService } from "../core/service/IProduct.service";
import { ProudctRepository } from "../data/repository/product.repository";
import { Observable } from "rxjs";
import { ProductListItemModel } from "../core/domain/product/product-list-item.model";
import { ProductModel } from "../core/domain/product/product.model";
import { CategoryListItemModel } from "../core/domain/product/category-list-item.model";
import { SimpleResponse } from "../core/domain/simple-response.model";
import { ReviewListItemModel } from "../core/domain/product/review-list-item.model";
import { categoryNameListItemModel } from "../core/domain/product/category-name-list.model";
import { ProductFilterProductListItemModel } from "../core/domain/product/product-filter-list.model";
import { BrandListItemModel } from "../core/domain/product/brand-list-item.model";
import { CartItemDetailsModel } from "../core/domain/product/cart-details-item.model";

@Injectable({
    providedIn:'root'
}) 

export class ProductService extends IProductService{

    constructor(private productRepository : ProudctRepository){
        super();
    }

    override getProductList(): Observable<ProductListItemModel[]> {
        return this.productRepository.getProductList();
    }

    override getRecentlyAddedProductList(): Observable<ProductListItemModel[]> {
        return this.productRepository.getRecentlyAddedProductList();
    }

    override getFeaturedProducts(): Observable<ProductListItemModel[]> {
        return this.productRepository.getFeaturedProducts();
    }

    override getSimilarProducts(productId:string,query: string, category: string): Observable<ProductListItemModel[]> {
        return this.productRepository.getSimilarProducts(productId , query, category);
    }

    override getfilterProductList(page: number, query: string, category: string, price: string, rating: string, order: string, brand:string): Observable<ProductFilterProductListItemModel> {
        return this.productRepository.getfilterProductList(page, query, category, price, rating, order, brand);
    }

    override getProductDetails(id: string): Observable<ProductModel> {
        return this.productRepository.getProductDetails(id);
    }

    override getCategoryList(): Observable<CategoryListItemModel[]> {
        return this.productRepository.getCategoryList();
    }

    override saveReview(rating: number, message: string, productId: string): Observable<SimpleResponse> {
        return this.productRepository.saveReview(rating, message, productId);
    }

    override getProductReviewList(productId: string): Observable<ReviewListItemModel[]> {
        return this.productRepository.getProductReviewList(productId);
    }

    override getCategoryNameList(): Observable<categoryNameListItemModel[]> {
        return this.productRepository.getCategoryNameList();
    }

    override getBrandList(): Observable<BrandListItemModel[]> {
        return this.productRepository.getBrandList();
    }

    override getCartProductDetails(productIds: string[]): Observable<CartItemDetailsModel[]> {
        return this.productRepository.getCartProductDetails(productIds);
    }
}