import { Component, OnDestroy, OnInit } from '@angular/core';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { ProductRatingComponent } from '../../components/product-rating/product-rating.component';
import { IncrDecrButtonComponent } from '../../components/incr-decr-button/incr-decr-button.component';
import { RouterLink } from '@angular/router';
import { TabComponent } from '../../components/tab/tab.component';
import { TabContentComponent } from '../../components/tab-content/tab-content.component';
import { ReviewCardComponent } from '../../components/review-card/review-card.component';
import { ReviewFormComponent } from '../../components/review-form/review-form.component';
import { SectionComponent } from '../../components/section/section.component';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/store.state';
import { addToCart, decrementProductCount, incrementProductCount } from '../../../store/cart/cart.action';
import { ProductModel } from '../../../core/domain/product/product.model';
import { getCart } from '../../../store/cart/cart.selector';
import { Subscription } from 'rxjs';
import { ToasterService } from '../../../service/toaster.service';

@Component({
  selector: 'app-product-details-screen',
  standalone: true,
  imports: [BreadcrumbComponent, ProductRatingComponent, IncrDecrButtonComponent, RouterLink, TabComponent, TabContentComponent, ReviewCardComponent, ReviewFormComponent, SectionComponent, ProductCardComponent],
  templateUrl: './product-details-screen.component.html',
  styleUrl: './product-details-screen.component.scss'
})

export class ProductDetailsScreenComponent implements OnInit, OnDestroy{

  productDetails:ProductModel = {
    id:'1',
    name:'Product Name',
    discription:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem ducimus aliquam asperiores quibusdam labore reprehenderit, ut veniam recusandae repudiandae sapiente.',
    price:100,
    rating:4.5,
    reviews:11,
    image:'./../../../../assets/img/product-1.jpg'
  }

  cartSubscription:Subscription|undefined;
  isProductAddedInCart:boolean = false;
  productCartCount:number = 1;

  constructor(private store:Store<AppState>, private toasterService:ToasterService){}

  ngOnInit(): void {
    this.cartSubscription = this.store.select(getCart).subscribe((cartState => {
      const product = cartState.items.find((product => product.productId === this.productDetails.id));

      if(product){
        this.isProductAddedInCart = true;
        this.productCartCount = product.count;
      }
    }));
  }

  ngOnDestroy(): void {
    
  }

  onIncrement(productId:string){
    this.store.dispatch(incrementProductCount({productId}));
  }

  onDecrement(productId:string){
    this.store.dispatch(decrementProductCount({productId}));
  }

  addToCart(){
    if(this.isProductAddedInCart){
      this.toasterService.success('Proudct is already added into cart.');
      return;
    } 

    this.store.dispatch(addToCart({productId:this.productDetails.id, count:1, Image:this.productDetails.image, Name:this.productDetails.name, price:this.productDetails.price}));
    this.toasterService.success('Proudct is added to the cart.');
  }
}
