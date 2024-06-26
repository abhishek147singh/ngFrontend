import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { SliderComponent } from '../../components/slider/slider.component';
import { SectionComponent } from '../../components/section/section.component';
import { CategoryCardComponent } from '../../components/category-card/category-card.component';
import { FreaturCardComponent } from '../../components/freatur-card/freatur-card.component';
import { ImageCardSliderComponent } from '../../components/image-card-slider/image-card-slider.component';
import { ToasterService } from '../../../service/toaster.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/store.state';
import { addToCart } from '../../../store/cart/cart.action';
import { ProductListItemModel } from '../../../core/domain/product/product-list-item.model';
import { Observable, Subscription } from 'rxjs';
import { ProductService } from '../../../service/product.service';
import { CategoryListItemModel } from '../../../core/domain/product/category-list-item.model';
import { RouterLink } from '@angular/router';
import { BrandListItemModel } from '../../../core/domain/product/brand-list-item.model';
import { AsyncPipe, NgIf } from '@angular/common';
import { OwlSliderComponent } from '../../components/owl-slider/owl-slider.component';

@Component({
  selector: 'app-home-screen',
  standalone: true,
  imports: [
    ProductCardComponent, 
    SliderComponent, 
    SectionComponent,
    CategoryCardComponent,
    FreaturCardComponent, 
    ImageCardSliderComponent, 
    RouterLink,
    AsyncPipe,
    NgIf,
    OwlSliderComponent
  ],
  templateUrl: './home-screen.component.html',
  styleUrl: './home-screen.component.scss'
})

export class HomeScreenComponent implements OnInit, OnDestroy{
  productList:ProductListItemModel[] = [];
  
  recentlyAddedProudcts:ProductListItemModel[] = [];
  recentlyAddedProductsSubscription:Subscription|undefined;

  featuredProudcts:ProductListItemModel[] = [];
  featuredProudctsSubscription:Subscription|undefined;

  categoryList:CategoryListItemModel[] = [];
  brandList$:Observable<BrandListItemModel[]>|undefined;

  categoryListSubscription:Subscription|undefined;
  productListSubscription:Subscription|undefined;

  constructor(
    private toasterService:ToasterService, 
    private store:Store<AppState>,
    private productService:ProductService
  ){}

  ngOnInit(): void {
    this.productListSubscription = this.productService.getProductList().subscribe({
      next:(response => {
        this.productList = response;
      }),
      error:(error => {
        console.log(error);
      })
    });

    this.categoryListSubscription = this.productService.getCategoryList().subscribe({
      next:(categoryList => {
        this.categoryList = categoryList;
      }),
      error:(error => {
        console.log(error);
      })
    });

    this.recentlyAddedProductsSubscription = this.productService.getRecentlyAddedProductList().subscribe({
      next:(response => {
        this.recentlyAddedProudcts = response;
      }),
      error:(error => {
        console.log(error);
      })
    });

    this.featuredProudctsSubscription = this.productService.getFeaturedProducts().subscribe({
      next:(response => {
        this.featuredProudcts = response;
      }),
      error:(error => {
        console.log(error);
      })
    });

    this.brandList$ = this.productService.getBrandList();
  }

  ngOnDestroy(): void {
    this.productListSubscription?.unsubscribe();
    this.categoryListSubscription?.unsubscribe();
  }


  addToCart(productDetails:{ productId:string; Image:string; Name:string; price:number; count:number; maxCount:number}){
    this.store.dispatch(addToCart(productDetails));
    this.toasterService.success('Product is added to the cart.');
  }

  mapBrandList(brandList:BrandListItemModel[]){
    return brandList.map(item => item.image);
  }
}
