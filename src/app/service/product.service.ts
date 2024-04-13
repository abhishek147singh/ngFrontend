import { Injectable } from "@angular/core";
import { IProductService } from "../core/service/IProduct.service";
import { ProudctRepository } from "../data/repository/product.repository";
import { Observable } from "rxjs";
import { ProductListItemModel } from "../core/domain/product/product-list-item.model";
import { ProductModel } from "../core/domain/product/product.model";
import { CategoryListItemModel } from "../core/domain/product/category-list-item.model";

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

    override getProductDetails(id: string): Observable<ProductModel> {
        return this.productRepository.getProductDetails(id);
    }

    override getCategoryList(): Observable<CategoryListItemModel[]> {
        return this.productRepository.getCategoryList();
    }
}