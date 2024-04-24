import { Injectable, OnDestroy, OnInit } from "@angular/core";
import { IProductRepository } from "../../core/repository/IProduct.repository";
import { baseUrl } from "../../../environment";
import { HttpClient } from "@angular/common/http";
import { Observable, Subscription, map } from "rxjs";
import { ProductListItemModel } from "../../core/domain/product/product-list-item.model";
import { ProductModel } from "../../core/domain/product/product.model";
import { ProductListEntity } from "../../entity/product/product-list.entity";
import { ProductEntity } from "../../entity/product/product.entity";
import { CategoryListItemModel } from "../../core/domain/product/category-list-item.model";
import { CategoryListEntity } from "../../entity/product/category-list.entity";
import { SimpleResponse } from "../../core/domain/simple-response.model";
import { Store } from "@ngrx/store";
import { AppState } from "../../store/store.state";
import { getAuth } from "../../store/auth/auth.selector";
import { ReviewListItemModel } from "../../core/domain/product/review-list-item.model";
import { ReviewListEntity } from "../../entity/product/review-list-item.model";
import { categoryNameListItemModel } from "../../core/domain/product/category-name-list.model";
import { CategoryNameListEntity } from "../../entity/product/category-name-list.entity";
import { ProductFilterProductListItemModel } from "../../core/domain/product/product-filter-list.model";
import { ProductFilterListEntity } from "../../entity/product/productFilterList.model";
import { BrandListItemModel } from "../../core/domain/product/brand-list-item.model";
import { BrandListEntity } from "../../entity/product/brand-list.entity";

@Injectable({
    providedIn: 'root'
})

export class ProudctRepository extends IProductRepository{
    baseUrl = baseUrl;
    token = '';

    constructor(private http:HttpClient, private store:Store<AppState>){
        super();
        this.store.select(getAuth).subscribe(authState => {
            this.token = authState.token;
        })
    }

    override getProductList(): Observable<ProductListItemModel[]> {
        const url = `${baseUrl}/api/product/`;

        return this.http.get<ProductListEntity>(url).pipe(
            map(response => {
                if (response.status) {
                    return response.data;
                }

                throw new Error(response.message);
            })
        );
    }

    override getRecentlyAddedProductList(): Observable<ProductListItemModel[]> {
        const url = `${baseUrl}/api/product/recentProducts`;

        return this.http.get<ProductListEntity>(url).pipe(
            map(response => {
                if (response.status) {
                    return response.data;
                }

                throw new Error(response.message);
            })
        );
    }

    override getFeaturedProducts(): Observable<ProductListItemModel[]> {
        const url = `${baseUrl}/api/featured-products/list`;

        return this.http.get<ProductListEntity> (url).pipe(
            map(response => {
                if (response.status) {
                    return response.data;
                }

                throw new Error(response.message);
            })
        );
    }

    override getSimilarProducts(productId:string, query: string, category: string): Observable<ProductListItemModel[]> {
        const url = `${baseUrl}/api/product/similarProducts?query=${query}&category=${category}&product=${productId}`;

        return this.http.get<ProductListEntity>(url).pipe(
            map(response => {
                if (response.status) {
                    return response.data;
                }

                throw new Error(response.message);
            })
        );
    }

    override getfilterProductList(page: number, query: string, category: string, price: string, rating: string, order: string,brand:string):Observable<ProductFilterProductListItemModel>{
        const url = `${baseUrl}/api/product/search?page=${page}&query=${query}&category=${category}&price=${price}&rating=${rating}&order=${order}&brand=${brand}`;

        return this.http.get<ProductFilterListEntity>(url).pipe(
            map(response => {
                if (response.status) {
                    return response.data;
                }

                throw new Error(response.message);
            })
        );
    }

    override getProductDetails(id: string): Observable<ProductModel> {
        const url = `${baseUrl}/api/product/${id}`;

        return this.http.get<ProductEntity>(url).pipe(
            map(response => {
                if (response.status) {
                    return response.data;
                }

                throw new Error(response.message);
            })
        );
    }

    override getCategoryList(): Observable<CategoryListItemModel[]> {
        const url = `${baseUrl}/api/product/categoryList`;

        return this.http.get<CategoryListEntity> (url).pipe(
            map(response => {
                if (response.status) {
                    return response.data;
                }

                throw new Error(response.message);
            })
        );
    }

    override saveReview(rating: number, message: string, productId: string): Observable<SimpleResponse> {
     const url = `${baseUrl}/api/review/${productId}`;
     
     return this.http.post<SimpleResponse> (url, {rating, message},{
            headers:{'authorization': this.token}
        }).pipe(
            map(response => {
                if (response.status) {
                    return response;
                }

                throw new Error(response.message);
            })
        );
    }

    override getProductReviewList(productId: string): Observable<ReviewListItemModel[]> {
        const url = `${baseUrl}/api/review/${productId}`;
     
        return this.http.get<ReviewListEntity> (url).pipe(
            map(response => {
                if (response.status) {
                    return response.data;
                }

                throw new Error(response.message);
            })
        );
    }

    override getCategoryNameList(): Observable<categoryNameListItemModel[]> {
        const url = `${baseUrl}/api/category/`;
     
        return this.http.get<CategoryNameListEntity> (url).pipe(
            map(response => {
                if (response.status) {
                    return response.data;
                }

                throw new Error(response.message);
            })
        );
    }

    override getBrandList(): Observable<BrandListItemModel[]> {
        const url = `${baseUrl}/api/brand/list`;

        return this.http.get<BrandListEntity> (url).pipe(
            map(response => {
                if (response.status) {
                    return response.data;
                }

                throw new Error(response.message);
            })
        );
    }
}