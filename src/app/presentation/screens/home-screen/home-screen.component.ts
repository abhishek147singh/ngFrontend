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
import { Subscription } from 'rxjs';
import { ProductService } from '../../../service/product.service';
import { CategoryListItemModel } from '../../../core/domain/product/category-list-item.model';

@Component({
  selector: 'app-home-screen',
  standalone: true,
  imports: [ProductCardComponent, SliderComponent, SectionComponent,CategoryCardComponent,FreaturCardComponent, ImageCardSliderComponent],
  templateUrl: './home-screen.component.html',
  styleUrl: './home-screen.component.scss'
})

export class HomeScreenComponent implements OnInit, OnDestroy{
  productList:ProductListItemModel[] = [];
  categoryList:CategoryListItemModel[] = [];
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
      error:(error => {})
    });

    this.categoryListSubscription = this.productService.getCategoryList().subscribe({
      next:(categoryList => {
        this.categoryList = categoryList;
      })
    })
  }

  ngOnDestroy(): void {
    this.productListSubscription?.unsubscribe();
    this.categoryListSubscription?.unsubscribe();
  }


  addToCart(productDetails:{ productId:string; Image:string; Name:string; price:number; count:number;}){
    this.store.dispatch(addToCart(productDetails));
    this.toasterService.success('Product is added to the cart.');
    console.log(productDetails);
  }
}
