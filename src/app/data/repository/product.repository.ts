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
}