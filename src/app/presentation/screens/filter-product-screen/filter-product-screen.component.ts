import { Component, OnDestroy, OnInit } from '@angular/core';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { FilterComponent } from '../../components/filter/filter.component';
import { BackToTopComponent } from '../../components/back-to-top/back-to-top.component';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ProductService } from '../../../service/product.service';
import { AsyncPipe, NgIf } from '@angular/common';
import { ProductFilterProductListItemModel } from '../../../core/domain/product/product-filter-list.model';

@Component({
  selector: 'app-filter-product-screen',
  standalone: true,
  imports: [BreadcrumbComponent, AsyncPipe , NgIf , ProductCardComponent, PaginationComponent, FilterComponent, BackToTopComponent],
  templateUrl: './filter-product-screen.component.html',
  styleUrl: './filter-product-screen.component.scss'
})

export class FilterProductScreenComponent implements OnInit, OnDestroy{
  routeSubscription:Subscription|undefined;
  page:number = 1;
  query:string = 'all'; 
  category:string = 'all';
  price:string = 'all'; 
  rating:string = 'all';
  order:string = 'newest';
  brand:string = 'all';

  productList:Observable<ProductFilterProductListItemModel>|undefined;

  constructor(private route: ActivatedRoute, private productService:ProductService){}

  ngOnInit(): void {
    this.routeSubscription = this.route.queryParams.subscribe(queryState => {
      this.category =  this.setValueFromUrl(queryState['category']);
      this.brand = this.setValueFromUrl(queryState['brand']);
      this.query = this.setValueFromUrl(queryState['query']);

      this.productList = this.productService.getfilterProductList(this.page, this.query, this.category, this.price, this.rating, this.order, this.brand);
    });
  }

  setValueFromUrl(value:any){
    if(value){
      return value;
    }

    return 'all';
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
  }
}
