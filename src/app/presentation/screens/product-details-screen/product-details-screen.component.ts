import { Component, OnDestroy, OnInit } from '@angular/core';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { ProductRatingComponent } from '../../components/product-rating/product-rating.component';
import { IncrDecrButtonComponent } from '../../components/incr-decr-button/incr-decr-button.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
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
import { Observable, Subscription, take } from 'rxjs';
import { ToasterService } from '../../../service/toaster.service';
import { ProductService } from '../../../service/product.service';
import { assetsPath } from '../../../../environment';
import { getAuth } from '../../../store/auth/auth.selector';
import { ReviewListItemModel } from '../../../core/domain/product/review-list-item.model';
import { AsyncPipe } from '@angular/common';
import { ProductListItemModel } from '../../../core/domain/product/product-list-item.model';

@Component({
  selector: 'app-product-details-screen',
  standalone: true,
  imports: [
    BreadcrumbComponent, 
    ProductRatingComponent, 
    IncrDecrButtonComponent, 
    RouterLink, 
    TabComponent, 
    TabContentComponent, 
    ReviewCardComponent, 
    ReviewFormComponent, 
    SectionComponent, 
    ProductCardComponent,
    AsyncPipe
  ],
  templateUrl: './product-details-screen.component.html',
  styleUrl: './product-details-screen.component.scss'
})

export class ProductDetailsScreenComponent implements OnInit, OnDestroy{

  productDetails:ProductModel = {
    _id:'',
    name:'Product Name',
    description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem ducimus aliquam asperiores quibusdam labore reprehenderit, ut veniam recusandae repudiandae sapiente.',
    price:100,
    rating:4.5,
    noReviews:11,
    img:'./../../../../assets/img/product-1.jpg',
    discount:0,
    brand:'',
    countInStock:0
  }

  cartSubscription:Subscription|undefined;
  productSubscription:Subscription|undefined;
  isProductAddedInCart:boolean = false;
  productCartCount:number = 1;

  assetsPath = assetsPath;

  storeSubcription:Subscription|undefined;
  routeSubscription:Subscription|undefined;
  isUserLogin = false;

  reviewList:Observable<ReviewListItemModel[]> | undefined;

  similarProductList:Observable<ProductListItemModel[]>|undefined;

  constructor(
    private store:Store<AppState>, 
    private toasterService:ToasterService, 
    private productService:ProductService,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.storeSubcription = this.store.select(getAuth).subscribe({
      next:(authState => {
        this.isUserLogin = authState.token !== '';;
      })
    })

    this.cartSubscription = this.store.select(getCart).subscribe((cartState => {
      const product = cartState.items.find((product => product.productId === this.productDetails._id));

      if(product){
        this.isProductAddedInCart = true;
        this.productCartCount = product.count;
      }
    }));

    this.routeSubscription = this.route.params.subscribe(routeState => {
      console.log(routeState);
      const productId = routeState['id'];
      if(productId){
        this.productService.getProductDetails(productId).pipe(take(1)).subscribe({
          next:(response => {
            this.productDetails = response;
          }),
          error:(error => {
            console.log(error);
          })
        })

        this.reviewList = this.productService.getProductReviewList(productId);
        this.similarProductList = this.productService.getProductList();
      }
    });
  }

  ngOnDestroy(): void {
    this.storeSubcription?.unsubscribe();
    this.cartSubscription?.unsubscribe();
    this.routeSubscription?.unsubscribe();
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

    this.store.dispatch(addToCart({productId:this.productDetails._id, count:1, Image:this.productDetails.img, Name:this.productDetails.name, price:this.productDetails.price}));
    this.toasterService.success('Proudct is added to the cart.');
  }
}
