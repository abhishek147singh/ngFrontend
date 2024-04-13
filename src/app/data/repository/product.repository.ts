import { Injectable } from "@angular/core";
import { IProductRepository } from "../../core/repository/IProduct.repository";
import { baseUrl } from "../../../environment";
import { HttpClient } from "@angular/common/http";
import { Observable, map } from "rxjs";
import { ProductListItemModel } from "../../core/domain/product/product-list-item.model";
import { ProductModel } from "../../core/domain/product/product.model";
import { ProductListEntity } from "../../entity/product/product-list.entity";
import { ProductEntity } from "../../entity/product/product.entity";
import { CategoryListItemModel } from "../../core/domain/product/category-list-item.model";
import { CategoryListEntity } from "../../entity/product/category-list.entity";

@Injectable({
    providedIn: 'root'
})

export class ProudctRepository extends IProductRepository{
    
    baseUrl = baseUrl;

    constructor(private http:HttpClient){
        super();
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
        const url = `${baseUrl}/api/product/category`;

        return this.http.get<CategoryListEntity>(url).pipe(
            map(response => {
                if (response.status) {
                    return response.data;
                }

                throw new Error(response.message);
            })
        );
    }

}