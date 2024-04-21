import { Component, OnDestroy, OnInit } from '@angular/core';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { FilterComponent } from '../../components/filter/filter.component';
import { BackToTopComponent } from '../../components/back-to-top/back-to-top.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ProductService } from '../../../service/product.service';
import { AsyncPipe, NgIf } from '@angular/common';
import { ProductFilterProductListItemModel } from '../../../core/domain/product/product-filter-list.model';
import { ToggleMenuComponent } from '../../components/toggle-menu/toggle-menu.component';
import { PriceFilterComponent } from '../../components/price-filter/price-filter.component';
import { RatingFilterComponent } from '../../components/rating-filter/rating-filter.component';

@Component({
  selector: 'app-filter-product-screen',
  standalone: true,
  imports: [
    BreadcrumbComponent, 
    AsyncPipe, 
    NgIf, 
    ProductCardComponent, 
    PaginationComponent, 
    FilterComponent, 
    BackToTopComponent, 
    ToggleMenuComponent,
    PriceFilterComponent,
    RatingFilterComponent
  ],
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
  brands:string[] = [];

  brandFilterInputs:{
    label:string;
    value:string;
    noProducts:number;
  }[] = [
    {label:'string1',value:'1',noProducts:0},
    {label:'string2',value:'2',noProducts:0},
    {label:'string3',value:'3',noProducts:0},
    {label:'string4',value:'4',noProducts:0},
    {label:'string5',value:'5',noProducts:0},
    {label:'string5',value:'5',noProducts:0},
    {label:'string5',value:'5',noProducts:0},
    {label:'string5',value:'5',noProducts:0},
  ]; 

  productList:Observable<ProductFilterProductListItemModel>|undefined;

  constructor(
    private route: ActivatedRoute, 
    private productService:ProductService,
    private router:Router
  ){}

  ngOnInit(): void {
    this.page = 1;
    this.routeSubscription = this.route.queryParams.subscribe(queryState => {
      this.category =  this.setValueFromUrl(queryState['category']);
      this.brand = this.setValueFromUrl(queryState['brand']);
      this.query = this.setValueFromUrl(queryState['query']);
      
      if(queryState['page']){
        this.page = queryState['page'];
      }

      if(this.brand){
        this.brands = this.brand.split('-');
      }
      this.refreshList();
    });
  }

  refreshList(){
    this.productList = this.productService.getfilterProductList(this.page, this.query, this.category, this.price, this.rating, this.order, this.brand);
  }

  changeUrl(category:string,brand:string,query:string, page:number){
    this.router.navigate(['/', 'shop'], {
      queryParams:{ category, brand, query, page}
    });
  }

  setValueFromUrl(value:any){
    if(value){
      return value;
    }

    return 'all';
  }

  onPageChange(pageNo:number){
    this.page = pageNo + 1;
    this.changeUrl(this.category,this.brand, this.query, this.page);
  }

  onOrderChange(order:string){
    this.order = order;
    this.page = 1;
    this.refreshList();
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
  }

  onBrandSelect(brands:string[]){
    this.brand = brands.join('-');
    this.page = 1;
    this.changeUrl(this.category, this.brand, this.query, this.page);
  }

  onRatingChange(value:number){
    this.rating = value.toString();
    this.refreshList();
  }

  onPriceRangeChange(priceRange:{min:number; max:number}){
    if(priceRange.min === 0 && priceRange.max === 0){
      this.price = `all`;
      this.page = 1;
      this.refreshList();
    }else{
      this.price = `${priceRange.min}-${priceRange.max}`;
      this.page = 1;
      this.refreshList();
    }
  }

  onCategorySelect(categories:string[]){
    if(categories.length > 0){
      const category = categories[0];
      this.page = 1;
      this.changeUrl(category, this.brand, this.query, this.page);
    }else{
      const category = '';
      this.page = 1;
      this.changeUrl(category, this.brand, this.query, this.page);
    }
  }

  mapBrandAndCategoryList(data:{_id: string; name: string; noProducts: number; image: string}[]){
    return data.map(value => { return {label: value.name, value:value._id, noProducts:value.noProducts};});
  }
}
